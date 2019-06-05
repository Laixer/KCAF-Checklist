<template>
    <header class="banner" :style="{'background-image': 'url(' + backgroundImage + ')' }" id="pageTop"></header>
</template>

<script>
const whitelabel = require('../../whitelabel.config')[process.env.VUE_APP_BRAND];
export default {
  name: 'Banner',
  data() {
      return {
          backgroundImage: whitelabel.bannerImage,
      }
  }
}
</script>

<style lang="scss">
    .banner {
        background: url('../../static/img/bg-rdam.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 37rem;
    }
</style>
