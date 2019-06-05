<template>
    <header>
        <nav id="menu-center">
            <ul>
                <li><img src="../../static/img/KCAFLogo.png" alt="logo"></li>
                <li><a href="#" class="active menu-item-1">Home </a></li>
                <li><a href="#documenten" class="menu-item-2">Documenten </a></li>
                <li><a href="#nieuwsbrief" class="menu-item-3">Nieuwsbrief </a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
const whitelabel = require('../../whitelabel.config')[process.env.VUE_APP_BRAND]
export default {
  name: 'Header',
  data() {
      return {
        logoURL: whitelabel.logoURL
      }
  }
}
</script>

<style lang="scss">
@import '../assets/sass/extends.scss';
@import '../assets/sass/header.scss';
</style>
