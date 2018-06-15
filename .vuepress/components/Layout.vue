<template>
  <div>
    <Page :sidebar-items="$parent.sidebarItems">
      <template slot="bottom">
        <Author/>
      </template>
    </Page>
    <component :is="$page.frontmatter.cta || 'CTA'"/>
    <Footer/>
  </div>
</template>

<script>
/*
<!-- <h1 slot="top">{{$page.title}}xx</h1> -->
<!-- {{Object.keys($root.$options.components)}} -->
<!-- {{Object.keys(Vue.options.components)}} -->
*/
import Author from './Author.vue'
import CTA from './CTA.vue'
import Footer from './Footer.vue'

export default {
  components: { Footer, Author, CTA }
}
</script>
