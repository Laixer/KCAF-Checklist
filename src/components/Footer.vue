<template>
    <footer>
        <p>ⓒ Gemaakt door <a href="https://zanhos.com/" target="_blank">ZanHos</a>. Versie {{version}}</p>
    </footer>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Footer',
    components: {
        VERSION
    },
    data () {
        return {
            version: VERSION,
        }
    }
}
</script>

<style lang="scss">
@import '../assets/sass/extends.scss';
@import '../assets/sass/footer.scss';
</style>
