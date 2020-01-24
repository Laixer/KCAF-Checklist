<template>
    <header>
        <nav id="menu-center">
            <ul>
                <li><a href="https://kcaf.nl"><img :src="logo" alt="logo"></a></li>
                <!-- <li><a href="#" class="active menu-item-1">Home </a></li>
                <li><a href="#documents" class="menu-item-2">Documenten </a></li>
                <li><a href="#newsletter" class="menu-item-3">Nieuwsbrief </a></li> -->
            </ul>
        </nav>
    </header>
</template>

<script>
const brand = process.env.VUE_APP_BRAND;
const whitelabel = require('../../whitelabel.config')[brand];
export default {
  name: 'Header',
  data() {
      return {
        logo: require('../../vendor/'+ brand +'/img/' + whitelabel.logo),
      }
  },
}
</script>

<style lang="scss">
@import '../assets/sass/extends.scss';
@import '../assets/sass/header.scss';
</style>
