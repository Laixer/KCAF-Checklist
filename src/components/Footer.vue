<template>
    <footer>
        <p>ⓒ Gemaakt door <a href="https://zanhos.com/" target="_blank">ZanHos</a>. Versie {{BRANCH}}</p>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style lang="scss">
    footer {
        background-color: #e8e8e8;
        width: 100%;
        padding: 0 5rem;
        height: 4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 1rem;
        p {
            color: #66615b;
            font-size: .9rem;
            a {
                color: #1393d6;
                text-decoration: none;
                &:active {color: #1393d6;}
            }
        }
    }
</style>
