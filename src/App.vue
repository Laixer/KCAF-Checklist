<template>
  
  <div id="app">
    <Header></Header>
    <Banner></Banner>
    <Home></Home>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Banner from './components/Banner.vue';
import Home from './components/Home.vue';

export default {
  name: 'app',
  components: {
    Header,
    Banner,
    Home
  }
}
</script>

<style lang="scss">
$lightblue: #82C2E8;
$blue: #28ABE3;
$darkblue: #004265;
$lightblack: #3B4552;
$black: #39434E;
$grey: #DEDEDE;
$main-font: 'Helvetica Neue';

html {
    box-sizing: border-box;
    font-family: $main-font, 'Myriad', 'Verdana', 'sans-serif';
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.07);
    scroll-behavior: smooth;
}

[v-cloak] { display: none; }

*,
*:before,
*:after {
    box-sizing: inherit;
}

h1 { font-size: 1.6rem; }
h2 { font-size: 1.4rem; }
h3 { font-size: 1.2rem; }
h4 { font-size: 1.0rem; }

body {
    margin: 0;
    background: #F8F8F8;
}

img[alt="logo"] {
    width: 2.7rem;
    margin-top: -0.4rem;
}

%btn {
    width: 100%; height: 2.8rem;
    border: none;
    font-size: 1.2rem;
    color: #fff;
    margin-top: 1.5rem;
    box-shadow: 2px 2px 8px #b1b1b1;
    cursor: pointer;
}

%back-button {
    color: rgb(170, 170, 170);
    text-decoration: none;
    font-weight: 300;
    text-shadow: none;
    font-size: 1rem;
    cursor: pointer;
    &:hover { text-decoration: underline; }
}
</style>
