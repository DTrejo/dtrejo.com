// @ts-check
const { extname, basename, join, relative, parse } = require('path')
const { statSync } = require('fs')
const sh = require('shelljs')
const matter = require('gray-matter')
const marked = require('marked')
const prism = require('prismjs');

if (!process.version.includes('v10')) console.warn('Works best on node >= 10')

const DEBUG = process.argv.includes('-v')
if (DEBUG) function l() { console.log.apply(console.log, arguments) }
else function l() { }

console.time('blah.js')

const loadLanguages = require('prismjs/components/')
marked.setOptions({
  highlight: function (code, language) {
    const lang = language || 'markup'
    if (!['js', 'css', 'markup'].includes(lang)) loadLanguages([ lang ])
    return prism.highlight(code, prism.languages[lang], lang)
  }
})

const dirs = {}
function mkdirp(f) {
  if (dirs[f]) return
  dirs[f] = true
  return sh.mkdir('-p', f)
}

// TODO always use absolute paths from the root of the project?
const ROOT = process.cwd()
l('ROOT', ROOT)
const DIST = join(ROOT, 'dist')
l('DIST', DIST)
l('mkdir -p', DIST)
mkdirp(DIST)

const CNAME = exists('CNAME') && sh.cat('CNAME').toString().trim() || 'localhost'
const DEFAULT_LAYOUT = '_layout.html'
const components = {}

const files =
  // untracked
  sh.exec('git ls-files -o --exclude-standard', { silent: true }).toString().trim().split('\n')
    // tracked
    .concat(sh.exec('git ls-files', { silent: true }).toString().trim().split('\n'))
    .filter(f => exists(f))

l('files', files)

let mds = []
let assets = []
let pages = []
for (let f, i = 0; f = files[i]; i++) {
  if (f === 'blah.js') continue
  if (f.indexOf('dist/') === 0) continue

  const base = basename(f)
  if (base[0] === '.') continue
  if (f.indexOf('_components/') === 0 && extname(f) === '.html') {
    component(f) // also processes these before .md
    continue
  }
  if (f[0] === '_' || base[0] === '_') continue
  const ext = extname(f)
  if (ext === '.md') {
    mds.push(f)
    const { content, ...rest } = matter(sh.cat(f).toString())
    // TODO: remove .html extensions from pages?
    const url = '/' + relative(ROOT, basename(f, '.md') /*+ '.html'*/).replace(/\/?index$/, '')
    pages.push({
      ...rest,
      url,
      href: (new URL(url, `https://${CNAME}`)).href
    })
    continue
  }
  assets.push(f)
}

l('mds', mds)
mds.forEach(md)

l('assets', assets)
assets.forEach(asset)

l('sitemap')
sitemap(pages)

function md(f) {
  const d = join(DIST, relative(ROOT, basename(f, '.md') + '.html'))
  l('md', f, '-->', d)

  const { content, data, excerpt } = matter(sh.cat(f).toString())
  // TODO consolidate this with the pages logic.
  data.url = '/' + relative(ROOT, basename(f, '.md') /*+ '.html'*/).replace(/\/?index$/, '')
  data.href = (new URL(data.url, `https://${CNAME}`)).href
  const layoutPath = data.layout || DEFAULT_LAYOUT
  if (!exists(layoutPath)) return console.warn('no such layout', layoutPath)
  // l('content', content)
  // l('data', data)

  // frontmatter with a "redirect: /blah" link in it.
  if (data.redirect) {
    /*if (!changed(f, d)) return*/
    return redirect(f, d, data)
  }

  // TODO add this back in. also check that dependent components haven't changed
  // if (!changed(f, d) && !changed(layoutPath, d)) {
  //     return l('skip md', f, d)
  // }

  // TODO components need to go in AFTER markdown processing, so their HTML
  // doesn't get messed up :/ ??? Or is that a feature???
  const componentScope = { require, pages, ...data }
  const scope = { ...runComponents(componentScope), ...componentScope }
  // l('scope with components', scope)
  const markdown = template(content, scope)
  const contentHTML = marked(markdown)
  const page = layout(scope, contentHTML)
  sh.ShellString(page).to(d)
}

function layout(data, contentHTML) {
  const layoutPath = data.layout || DEFAULT_LAYOUT
  if (!exists(layoutPath)) return contentHTML

  const layoutHTML = sh.cat(layoutPath).toString()
  const page = template(layoutHTML, { ...data, contentHTML, layoutPath })
  // l('layout', page)
  return page
}

function redirect(f, d, data) {
  // TODO: handle directories and / and index.html
  // TODO: handle offsite redirects
  l('redirect', f, data.redirect)

  const url = new URL(data.redirect, `https://${CNAME}`) // No https? too bad.
  l('redirect url ', url)

  const title = 'Redirecting...'
  const contentHTML = title
  // TODO make a default rel=canonical that points to the pretty link.
  // TODO use same url and put it in the page's context.
  const head = `<link rel="canonical" href=${JSON.stringify(url.href)}>`
  const bodyEnd = `<script>window.location.href = ${JSON.stringify(url.href)}</script>`
  const html = layout({ title, head, bodyEnd }, contentHTML)
  l('redirect', f, d)
  l('redirect html', html)
  sh.ShellString(html).to(d)
}

function asset(f) {
  const relpath = relative(ROOT, f)
  const d = join(DIST, relpath)
  const dir = parse(d).dir
  l('asset', f, '-> dest', d)
  if (!changed(f, d)) return l('skip cp', f, d)

  if (f.includes('/')) {
    l('asset mkdir -p ', dir)
    mkdirp(dir)
  }

  l('cp', f, d)
  sh.cp(f, d)
}

function sitemap(pages) {
  // l('sitemap pages[0]', JSON.stringify(pages[0], null, 2))
  sh.ShellString(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .filter((page) => !page.data.redirect)
        .map((page) =>
      `<url>
        <loc>${page.href}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page.data.changefreq || 'monthly'}</changefreq>
        <priority>${page.data.priority || '0.5'}</priority>
      </url>`
      ).join('')}
    </urlset>
  `).to(join(DIST, 'sitemap.xml'))
}

function changed(file, dest) {
  let dm
  try {
    dm = statSync(dest).mtime
  } catch (_) {
    // No dest file? need to generate it.
    return true
  }

  const fm = statSync(file).mtime
  return fm > dm
}

function exists(f) {
  return f && sh.test('-e', f)
}

// TODO: this strategy means that template variables in someone's code blocks
// will mess up if they don't escape them :(
// Upside: it is simple.
function template(content, scope) {
  const escapedContent = content.replace(/`/g, '%60')
  const t = new Function(`return \`${escapedContent}\``).bind(scope)
  const markdown = t().replace(/%60/g, '`')
  // l('template', markdown)
  return markdown
}

// TODO refactor so that we only parse and compile a component right before it
// is used, and then it is cached.
function component(f) {
  l('component', f)
  const name = basename(f, '.html')
  // newlines mess up html in markdown, so we remove them.
  const content = sh.cat(f).toString().replace(/\n/g, '').trim()
  if (content.includes('<script>')) {
    console.warn(`Make sure your <script> in ${name} uses semicolons!`)
  }
  if (components[name]) console.warn('overwriting component', name)
  l('component content', name, content)
  components[name] = function (scope) {
    return template(content, scope)
  }
}

function runComponents(scope) {
  const compiled = {}
  // add compiled to scope so components can use each other, if named well ;)
  for (let c in components) compiled[c] = components[c]({ compiled, ...scope })
  // for (let c in components) compiled[c] = components[c](scope)
  return compiled
}

// things we want to do
// √list documents
// √read in SSR template
// √read own mtime
// √read document max mtime from git and from fs
// √read frontmatter
// √render document's markdown to html
// √if just .html, copy it over to output dir, or serve it
// √ignores files starting with "_"
// √can make github friendly redirect html pages easily with rel=canonical
// √use frontmatter redirect: '/path' to redirect current page elsewhere
// √components work well enough
// √can make list of posts
// √can make sitemap, and sitemap.html
// √[no need] convert to use viper SSR.
// √reimplement CTA and author components
// √fix 404.html, use box2d.
// add asserts all over the place
// set up CI to publish it, check the vuepress suggested config
// replace the vue site. push this to the master branch.

// far future, or never
// [No] can include vue component for site search?

// ## Philosophy of this site
// - Only one major CTA on every page (mid-article CTAs are also okay)
// - Offer alternate CTAs at the end of the article, e.g. sign up! or... email me; read on)
// - Only show one column of text. no sidebar.
// - Only add TOC at the top for (long) non-sales articles
// - Homepage has... mini squeeze copy; sign up cta; read on;
//   then footer, to deemphasize:
//     √ my projects etc like it is on my current site
//     √ then my articles

// ## Questions
// - √how to make a sitemap.xml? see their github issues. someone wrote one.
// - √how to do redirects? w/ router injecting urls?
// - √improve meta tags, see old homepage.

// ## TODOs
// - √new color theme? or just improve the orange accentcolor? and improve the gold
//   on the CTA form? saturation.
// - √check cta form works
// - better headshot image?
// - √get my projects to load right: copy to public/; check em?
// - GA
// - link audit

// - turn workshop proposal(s) into a sales page
// - migrate engineeroverflow to here? w/ redirect.
// - migrate yelp rescues page to here? w/ redirect. fix yelp sales page
// - get samir's feedback and the maybe hide even more stuff / further focus it.

// - [ignore] use subdirectories to create prev/next? dunno. ignore it.
// - [ignore] prev/next links based on the homepage categories? too much work.
// - [ignore] show 3 "next" related articles under each article?
// - [ignore] give the visitor a quiz and only show them what they're interested in?
// - [ignore] image to color scheme library?

console.timeEnd('blah.js')
l('done')

// if (!process.env.argv.includes('-t')) return
// TODO: add tests
