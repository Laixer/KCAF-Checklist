<template>
    <header>
        <nav>
            <ul>
                <li><img src="../../static/img/KCAFLogo.png" alt="logo"></li>
                <li><a href="#" class="active">Home </a></li>
                <li><a href="#">Klacht </a></li>
                <li><a href="#documenten">Documenten </a></li>
                <li><a href="#nieuwsbrief">Nieuwsbrief </a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
  name: 'Header'
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
    header { 
        nav {
            position: fixed;
            z-index: 99;
            width: 100%;
            background-color: #fff;
            box-shadow: 0px 10px 10px -2px rgba(0, 0, 0, 0.15);
        }
            ul {
                display: grid;
                grid-template-columns: 5fr repeat(4, 1fr);
                align-items: center;
                list-style-type: none;
            }
                li {
                    padding: 0 3rem;
                    max-height: 2.5rem;
                }
                    a {
                        font-size: 1.2rem;
                        color: $black;
                        text-decoration: none;
                    }
                li:nth-child(1) { padding-left: 10rem; }
        .active { color: $blue; }
    }
</style>
