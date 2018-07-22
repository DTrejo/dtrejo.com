import NavLink from '@theme/NavLink.vue'
import Page from '@theme/Page.vue'

export default ({
  Vue,     // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router,  // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app
  Vue.component('NavLink', NavLink)
  Vue.component('Page', Page)
  // TODO how to overwrite or remove this?
  // Vue.component('OutboundLink', OutboundLink)
}
