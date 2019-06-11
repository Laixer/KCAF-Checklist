<template>
    <header class="banner" :style="{'background-image': 'url(' + backgroundImage + ')' }" id="pageTop"></header>
</template>

<script>
const brand = process.env.VUE_APP_BRAND;
const whitelabel = require('../../whitelabel.config')[brand];
export default {
  name: 'Banner',
  data() {
      return {
          backgroundImage: require('../../vendor/'+ brand +'/img/' + whitelabel.bannerImage),
      }
  }
}
</script>

<style lang="scss">
    .banner {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 37rem;
    }
</style>
