// @ts-check
const { extname, basename, join, relative, parse } = require('path')
const { statSync } = require('fs')
const sh = require('shelljs')
const matter = require('gray-matter')
const marked = require('marked')


const DEBUG = process.argv.includes('-v')
if (DEBUG) function l() { console.log.apply(console.log, arguments) }
else function l() {}

const viperHTML = require('viperhtml')

// const escapedContent = content.replace(/`/g, '%60')
const escapedContent = sh.cat('./_components/.viper.html').toString().trim()
const t = Function('render', 'model', 'require', 'pages', `return render\`${escapedContent}\``)
// const markdown = t().replace(/%60/g, '`')

// TODO: how to either 1) markdown process the string before using it as a template
// 2) run the string through the markdown thing AFTER the template evaluates [best!]
// for #2, still need to escape ``` fences. as for single ticks... not sure how
// to only escape the markdown ones, and not the template string ones.
// So, rule: no template strings allowed in markdown.

/*
    .md:
        -> escape ticks and fences
        -> viper render (components get pulled in here too)
        -> unescape ticks and fences
        -> markdown render
        -> return html
        No ticks in js template variables allowed
    layout.html, component.html
        -> viper render

    first, convert layout.html to viperhtml
    then, do the markdown stuff cause it is complicated
*/

let model = { 'thing': 1 }
let pages = [
    {frontmatter: { date: '1', tags: 'hiring'}, title: 'a', url: '/a' }
,   {frontmatter: { date: '2', tags: 'hiring'}, title: 'b', url: '/b' }
]

const htmlWithMarkdown = t(viperHTML.wire(), model, require, pages).toString()
console.log(htmlWithMarkdown)

console.log('---')
console.log(marked(htmlWithMarkdown))
// to fix the template

// I think this will work great. Just gotta make the html a one-liner and markdown
// will ignore it. So that will work great b/c components don't have markdown
// in them, only the .md file. If someone wants to use markdown in a component,
// they can make an inline markdown string! I think this will work great!!!
