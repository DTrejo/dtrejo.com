<template>
  <div>
    <Page :sidebar-items="$parent.sidebarItems">
      <!-- <h1 slot="top">{{$page.title}}xx</h1> -->
      <template slot="bottom">
        <Author/>
      </template>
      <!-- {{Object.keys($root.$options.components)}} -->
      <!-- {{Object.keys(Vue.options.components)}} -->
    </Page>
    <component :is="$page.frontmatter.cta || 'CTA'"/>
    <Footer/>
  </div>
</template>

<script>
import Page from 'vuepress/lib/default-theme/Page'
export default {
  components: { Page }
}
</script>
