---
layout: 'Layout'
heroImage: /images/dtrejo.jpg
# actionText: Get Started →
# actionLink: /guide/
# features:
# - title: Simplicity First
#   details: Minimal setup with markdown-centered project structure helps you focus on writing.
# - title: Vue-Powered
#   details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
# - title: Performant
#   details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
---
<div class="hero">
  <img
    v-if="data.heroImage"
    :src="$withBase(data.heroImage)"
    alt="hero"
  >
  <h1>{{ data.heroText || $title || 'Hello' }}</h1>
  <p class="description">
    {{ data.tagline || $description || 'Welcome to your VuePress site' }}
  </p>
  <!-- <p class="action" v-if="data.actionText && data.actionLink">
    <NavLink class="action-button" :item="actionLink"/>
  </p> -->
</div>

<hr/>
<br/>

Hey there,  
Which of these articles would you want me to write next? :)

A. ~10 A/B tests which earn us ~+$10MM/year at Credit Karma (along with conversion numbers)
B. How to keep shipping A/B tests while reducing technical debt from old dead experiment code
C. How to involve your analyst/engineering manager/marketing manager in the prioritization, opportunity finding, and sizing which needs to happen before you can build an experiment

Or, what would you like me to write about? Your questions about growth
engineering & conversion rate optimization will help me write more–talk to you
soon! <Email/>.

Thanks in advance,  
_David Trejo_  
<Email/>

<!--

## Philosophy of this site
- Only one major CTA on every page (mid-article CTAs are also okay)
- Offer alternate CTAs at the end of the article, e.g. sign up! or... email me; read on)
- Only show one column of text. no sidebar.
- Only add TOC at the top for non-sales articles
- Homepage has... mini squeeze copy; sign up cta; read on;
  then footer, to deemphasize:
    √my projects etc like it is on my current site; then my articles

## Questions
- [ignore for now] how to make a sitemap.xml? see their github issues. someone wrote one.
- [ignore for now] how to do redirects? w/ router injecting urls?
- [ignore] use subdirectories to create prev/next? dunno. ignore it.

## TODOs
- new color theme? or just accentcolor?
- >>> publish it!
- >>> set up CI to publish it

- check cta form works
- better headshot image via victoria?
- get my projects to load right: copy to public/; check em?
- GA
- fix dates at the start of filenames.
- create draft post for easy copying on github.
- migrate engineeroverflow.com to here?
- migrate yelp rescues page to here?
- turn workshop proposal(s) into a sales page
- image to color scheme library?

- get samir's feedback and the maybe hide even more stuff / further focus it.
- √ noindex nofollow everything while you work on it. or just robots.txt, for now.
- √ delete everything that is not relevant (or don't commit it)
- √ all other articles
- √ then do each growth article
- √add author images
- √do the CTA form
- √fix images
- √fix author image
- √finish CTA form
- √get the homepage looking like my homepage, for dtrejo.com
- √come up with a way to hide stuff from the listing of articles if old.
  e.g. && list !== false. or use an "archived" tag.
  Better: use a locale so they don't show in search bar.
- [ignore] prev/next links based on the homepage categories? too much work.
- [ignore] show 3 "next" related articles under each article?
- [ignore] give the visitor a quiz and only show them what they're interest in?

-->

<script>
import NavLink from 'vuepress/lib/default-theme/NavLink'
export default {
  components: { NavLink },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>
