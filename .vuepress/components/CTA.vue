<template>
  <div class="cta" v-if="$page.frontmatter.cta !== false">
    <form
      action="https://www.getdrip.com/forms/761954876/submissions"
      data-drip-embedded-form="761954876"
      method="post"
      accept-charset="utf-8"
    >
      <h3 data-drip-attribute="headline">
        Want to be a better Full Stack Growth Engineer?
      </h3>
      <div data-drip-attribute="description">
        You'll get articles with everything I learn as a growth engineer at Credit Karma, a profitable private company with &gt;75 million members, &gt;$1 billion valuation, and &gt;500 employees.
      </div>
      <p>
        <label for="drip-email"><strong>My email is </strong></label>
        <input
          id="drip-email"
          name="fields[email]"
          type="email"
          value=""
          placeholder="Email"
        />
        .
      </p>
      <div
        class="g-recaptcha"
        data-sitekey="6Lde4yAUAAAAAJmNA-cp7ySkBKDmf3NhprEn8Y8Z">
      </div>
      <input
        class="btn-6 btn-6a"
        data-drip-attribute="sign-up-button"
        type="submit"
        value="Get Helpful Articles"
      />
    </form>
  </div>
</template>

<script>
    var _dcq = _dcq || []
    var _dcs = _dcs || {}
    _dcs.account = '7413888'
    ;(function() {
      var dc = document.createElement('script')
      dc.type = 'text/javascript'
      dc.async = true
      dc.src = '//tag.getdrip.com/7413888.js'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(dc, s)
    })()

    ;(function() {
      var dc = document.createElement('script')
      dc.type = 'text/javascript'
      dc.async = true
      dc.defer = true
      dc.src = 'https://www.google.com/recaptcha/api.js'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(dc, s)
    })()
</script>

<style lang="stylus" scoped>
  .cta
    max-width 31rem
    margin 0 auto
    padding 1rem

  .g-recaptcha
    margin-bottom 1rem

  //
  // CTA forms, primary and seconday, madlibs
  //
  $form-color = #222
  $form-background-color = #1d2327
  $form-background-color = #739ecd
  $form-background-color = #c1d1e9
  $form-input-color = #2a4e76
  $form-input-underline-color = $form-input-color
  $placeholder-color = $form-input-color
  .cta
    background-color $form-background-color
    color $form-color

  input[placeholder]
    font-size 1.75rem
    border none
    border-bottom 1px dashed $form-color
    background-color transparent
    max-width 100%
    text-align center
    color #2a4e76

  .btn-6
    // zoom 0.6
    border none
    font-family inherit
    font-size 1.25rem
    color inherit
    background none
    cursor pointer
    padding .5rem
    display inline-block
    text-transform uppercase
    letter-spacing 1px
    font-weight 700
    outline none
    position relative
    -webkit-transition all 0.3s
    -moz-transition all 0.3s
    transition all 0.3s

  .btn-6:after
    content ''
    position absolute
    z-index -1
    -webkit-transition all 0.3s
    -moz-transition all 0.3s
    transition all 0.3s

  $btn-color = #226fbe
  $btn-color = $form-input-underline-color
  /* Button 6 */
  .btn-6
    color #fff
    background $btn-color
    -webkit-transition none
    -moz-transition none
    transition none

  .btn-6:active
    top 2px

  /* Button 6a */
  .btn-6a
    border 4px solid $btn-color

  .btn-6a:hover
    background transparent
    color $btn-color

  /* Button 6b */
  .btn-6b
    border 4px solid $btn-color
    border-radius 15px

  .btn-6b:hover
    background transparent
    color $btn-color

  #primarycta
    background-color gold
    .btn-6
      color gold
      &:hover
        color $btn-color
</style>
