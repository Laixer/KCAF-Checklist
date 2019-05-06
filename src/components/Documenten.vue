<template>
    <section id="documenten">
        <h1>Neem een kijk aan onze documenten</h1>
        <div class="figures">
            <figure>
                <img src="../../static/img/5jaarKCAF.png" alt="5jaarKCAF">
                <figcaption>
                    <p>5 jaar KCAF</p>
                </figcaption>
            </figure>
            <figure>
                <img src="../../static/img/grondwateraanvulling.png" alt="5jaarKCAF">
                <figcaption>
                    <p>Grondwateraanvulling voor funderingbehoud</p>
                </figcaption>
            </figure>
            <figure>
                <img src="../../static/img/juridische_handleiding.png" alt="5jaarKCAF">
                <figcaption>
                    <p>Juridische handleiding</p>
                </figcaption>
            </figure>
            <figure>
                <img src="../../static/img/handboek_funderingsherstel.png" alt="5jaarKCAF">
                <figcaption>
                    <p>Handboek Funderingsherstel</p>
                </figcaption>
            </figure>
            <figure>
                <img src="../../static/img/handleiding_gemeenten.png" alt="5jaarKCAF">
                <figcaption>
                    <p>Handleiding voor gemeenten</p>
                </figcaption>
            </figure>
            <figure>
                <img src="../../static/img/stappenplan.png" alt="5jaarKCAF">
                <figcaption>
                    <p>Stappenplan bij problemen houten funderingen</p>
                </figcaption>
            </figure>
            <figure>
                <img src="../../static/img/funderingsherstel.png" alt="5jaarKCAF">
                <figcaption>
                    <p>Funderingsherstel & Energiebesparing</p>
                </figcaption>
            </figure>
            <figure>
                <img src="../../static/img/richtlijn_onderzoek.png" alt="5jaarKCAF">
                <figcaption>
                    <p>Richtlijn voor onderzoek naar houten paalfundering</p>
                </figcaption>
            </figure>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Documenten'
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
    
    #documenten {
        padding: 4rem 5rem;
        div.figures {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(295px, auto));
            grid-gap: 2rem;
        }
        figure {
            margin: 0 0 1rem 0;
            position: relative;
            cursor: pointer;
            max-width: 20rem; max-height: 20rem;
            img { width: 20rem; }
            figcaption{
                background-color: rgba(29, 29, 29, 0.8);
                color: #fff;
                display: flex;
                justify-content: center; align-items: center;
                text-align: center;
                position: absolute;
                bottom: -0.1rem;
                width: 20rem; height: 4rem;
                padding: 1rem;
            }
            &:hover {
                transform: scale(1.02) rotate(1deg);
                box-shadow: 5px 0px 40px rgba(0,0,0, .2);
                transition: all .2s linear;
            }
        }
    }
</style>
