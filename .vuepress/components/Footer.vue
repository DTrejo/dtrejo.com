<template>
  <div class="footer">
    <div>
      <h3>Hiring Engineers? You'll like these articles</h3>
      <Articles tag="hiring"/>

      <h3>Growth Engineering Articles</h3>
      <Articles tag="growth"/>

      <h3>How to...</h3>
      <Articles tag="howto"  not="archived, hiring, growth, git, nodejs"/>

      <h3>Node.js</h3>
      <Articles tag="nodejs" not="archived, hiring, growth"/>

      <h3>Git</h3>
      <Articles tag="git"    not="archived, hiring, growth, nodejs"/>

      <h3>Top Projects</h3>
      <ul>
        <li>
          <a href="https://EngineerWorth.com">EngineerWorth.com</a> Is that
          product feature worth coding? Run a quick ROI calculation and find out.
        </li>
        <li>
          <a href="/qlock/qlock.html">jQuery Qlock2</a> Tell time with this $800 clock, for free.
        </li>
        <li>
          <a href="/colorslice/">ColorSlice</a>
          Wish it were easier to steal and create color schemes?
          Colorslice helps front-end developers <span class="amp">&amp;</span>
          designers with color.
        </li>
        <li>
          <a href="/colorpreview/">ColorPreview</a>
          Vet color combinations and pick only the ones with enough contrast,
          that your eye finds pleasing.
        </li>
        <li>
          <a href="/lazytemplating/">Lazy Templating</a>
          What if you could do HTML templating using a spreadsheet? Now you
        can.
        </li>
        <li>
          <a href="http://github.com/DTrejo/ampline">Ampline</a>
          Tired of copy-pasting or tab-completing long file paths? Accelerate yourself
        on the command-line.
        </li>
      </ul>

      <h4><router-link to="/archived.html">Archived</router-link></h4>

      <h3>Find me</h3>
      <ul>
        <li><a href="https://github.com/DTrejo">Github</a></li>
        <li><a href="https://twitter.com/ddtrejo">Twitter</a></li>
        <li>
          <Email/>
        </li>
      </ul>

      <div v-if="$site.themeConfig.footer">
        {{ $site.themeConfig.footer }}
      </div>
    </div>
  </div>
</template>

<script>
import Articles from './Articles.vue'
export default {
  components: { Articles }
}
</script>

<style lang="stylus" scoped>
  @import '../override.styl'
  .footer {
    margin-top 5rem
    padding 3rem 0
    background-color $searchBgColor //$textColor
    color $textColor
  }
  .footer > * {
    max-width 33rem
    margin 0 auto
    padding-left 1rem
    padding-right 1rem
  }
</style>
