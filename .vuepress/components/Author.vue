<template>
  <div class="author" v-if="$page.frontmatter.author !== false">
    <!-- <pre>{{JSON.stringify([author], null, 2)}}</pre> -->
    <img :src="author.image" :title="author.imageTitle"/>
    <div class="details">
      <h4 v-if="author.link">
        <NavLink style="color: inherit" :item="{ link: author.link, text: author.name }"/>
      </h4>
      <h4 v-else>{{author.name}}</h4>
      <p>{{author.description}}</p>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  img {
    float left
    height 82px
    border-radius 50%
    margin-right 1rem
    margin-left 1rem
  }
  .author {
    max-width 33rem
    margin 0 auto
  }
  .details {
    overflow hidden
    zoom 1
    margin-right 1rem
  }
  h4 {
    margin-top 0
  }
</style>

<script>
  import NavLink from 'vuepress/lib/default-theme/NavLink'
  export default {
    components: { NavLink },
    computed: {
      author () {
        return this.$site.themeConfig.authors[this.$page.frontmatter.author]
          || this.$site.themeConfig.authors.default
      },
    }
  }
</script>
