<template>
  <a
    @click.prevent="email = '@dtrejo.com'"
    :href="email ? 'mailto:david' + email : '#david åt dtrejo.com'"
    title="david åt dtrejo.com"
  >
    {{ email ? 'david' + email : 'Email me ✉️' }}
  </a>
</template>

<script>
  export default {
    data: () => {
      return {
        email: false
      }
    }
  }
</script>
