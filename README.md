---
layout: 'Layout'
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
  <img v-if="data.heroImage" :src="$withBase(data.heroImage)" alt="hero">
  <h1>{{ data.heroText || $title || 'Hello' }}</h1>
  <p class="description">
    {{ data.tagline || $description || 'Welcome to your VuePress site' }}
  </p>
  <!-- <p class="action" v-if="data.actionText && data.actionLink">
    <NavLink class="action-button" :item="actionLink"/>
  </p> -->
</div>

<hr/>

<!-- 

## Philosophy of this site
- Only one major CTA on every page (mid-article CTAs are also okay)
- Offer alternate CTAs at the end of the article, e.g. sign up! or... email me; read on)
- Only show one column of text. no sidebar.
- Only add TOC at the top for non-sales articles
- Homepage has... mini squeeze copy; sign up cta; read on;
  then footer, to deemphasize:
    my projects etc like it is on my current site; then my articles
- migrate engineeroverflow.com to here

## Questions
- [ignore for now] how to make a sitemap.xml? see their github issues. someone wrote one.
- [ignore for now] how to do redirects? w/ router injecting urls?
- [ignore] use subdirectories to create prev/next? dunno. ignore it.

## TODOs
- √ noindex nofollow everything while you work on it. or just robots.txt, for now.
- √ delete everything that is not relevant (or don't commit it)
- √ all other articles
- √ then do each growth article
- √add author images
- √do the CTA form
- ~ publish it immediately, just a super barebones homepage
- ~ set up CI to publish it
- fix images
- finish author images
- finish CTA form
- sitemap
- get the homepage looking like my homepage, for dtrejo.com
- get my projects to load right: copy to public/
- GA
- come up with a way to hide stuff from the listing of articles if old.
  e.g. && list !== false. or use an "archived" tag.
  Better: use a locale so they don't show in search bar.
- prev/next links based on the homepage categories
-->

Best,  
_David Trejo_

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
