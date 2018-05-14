<template>
  <div class="cta" v-if="$page.frontmatter.cta !== false">
    <h3>CTA box here</h3>
  </div>
</template>

<style lang="stylus" scoped>
  .cta {
    max-width 31rem
    margin 0 auto
    border 1px solid
    padding 1rem
  }
</style>
