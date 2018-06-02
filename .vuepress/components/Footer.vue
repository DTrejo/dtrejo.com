<template>
  <div class="footer">
    <div>
      <h3>Hiring Engineers? You'll like these articles</h3>
      <Articles tag="hiring"/>

      <h3>Growth Engineering Articles</h3>
      <Articles tag="growth"/>

      <h3>How to...</h3>
      <Articles tag="howto"  not="hiring, growth, git, nodejs"/>

      <h3>Node.js</h3>
      <Articles tag="nodejs" not="hiring, growth"/>

      <h3>Git</h3>
      <Articles tag="git"    not="hiring, growth, nodejs"/>

      <!-- <h3>Projects</h3> -->
      <!-- TODO -->

      <h4><router-link to="/archived.html">Archived</router-link></h4>

      <h3>Find me</h3>
      <ul>
        <li><a href="https://github.com/DTrejo">Github</a></li>
        <li><a href="https://twitter.com/ddtrejo">Twitter</a></li>
        <li><a id="email" href="#" title="david at this domain">Email</a></li>
      </ul>

      <div v-if="$site.themeConfig.footer">
        {{ $site.themeConfig.footer }}
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  @import '../override.styl'
  .footer {
    margin-top 5rem
    padding 3rem 0
    background-color $textColor
    color $borderColor
  }
  .footer > * {
    max-width 33rem
    margin 0 auto
  }
</style>
