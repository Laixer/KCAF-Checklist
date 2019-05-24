<template>
    <section id="nieuwsbrief">
        <h1>Digitale Nieuwsbrief</h1>
        <div class="contentleft">
            <p>
                Schrijf u in voor onze digitale nieuwsbrief en blijf op de hoogte van de laatste ontwikkelingen op het gebied van funderingsproblematiek.
            </p>
            <button>Inschrijven</button>
            <div class="tweets">
                <h2>Tweets <i class="fab fa-twitter"></i></h2>
                <div v-for="tweet in tweets" :key="tweet.id">
                    <figure>
                        <figcaption>
                            <p> {{ tweet.text }} <a v-bind:href="tweet.url" target="_blank">
                                    {{ tweet.url }} </a></p>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
        <div class="contentright">
            <article class="article1">
                <div></div>
                <div class="article-header"><img src="../../static/img/nieuwsbrief-textbubble.png" alt="nieuwsbrief-textbubble">
                </div>
                <div></div>
            </article>
            <article class="article2">
                <div>
                    <p> 1 nieuwsartikel </p><span></span>
                </div>
                <div><button class="btn-collapse" @click.prevent="collapse"> April 2019</button></div>
                <div></div>
                <div class="content"> 
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div class="line-height"></div>
            </article>
            <article class="article3">
                <div></div>
                <div><button class="btn-collapse" @click.prevent="collapse"> Januari 2019</button></div>
                <div>
                    <p> 2 nieuwsartikel </p><span></span>
                </div>
            </article>
            <article  class="article4">
                <div>
                    <p> 5 nieuwsartikel </p><span></span>
                </div>
                <div><button class="btn-collapse"> Juli 2018</button></div>
                <div></div>
            </article>
            <article class="article5">
                <div></div>
                <div><button class="btn-collapse"> Juni 2018</button></div>
                <div>
                    <p> 8 nieuwsartikel </p><span></span>
                </div>
            </article>
            <article class="article6">
                <div>
                    <p> 1 nieuwsartikel </p><span></span>
                </div>
                <div><button class="btn-collapse"> Mei 2018</button></div>
                <div></div>
            </article>
            <article class="article7">
                <div></div>
                <div><button class="btn-collapse"> April 2018</button></div>
                <div>
                    <p> 3 nieuwsartikel </p><span></span>
                </div>
            </article>
            <article class="article8">
                <div>
                    <p> 1 nieuwsartikel </p><span></span>
                </div>
                <div><button class="btn-collapse"> November 2017</button></div>
                <div></div>
            </article>
            <article class="article9">
                <div></div>
                <div><button class="btn-collapse"> Oktober 2017</button></div>
                <div>
                    <p> 1 nieuwsartikel </p><span></span>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Nieuwsbrief',
    data() {
        return {
            tweets: [
                {
                   'id': 1,
                   'text': 'Vandaag is het landelijke Fonds Duurzaam Funderingsherstel in werking getreden voor lening funderingsherstel.',
                   'url': 'www.funderingsherstelfonds.nl'
                },
                {
                   'id': 2,
                   'text': 'KCAF vandaag op de woonbeurs in Schiedam. Voor advies over funderingsproblemen: kom langs bij ons én de buren van…',
                   'url': 'https://twitter.com/i/web/status/908987789202554882'
                },
                {
                   'id': 3,
                   'text': 'Friese boeren experimenteren met vernatten van veen',
                   'url': 'https://www.volkskrant.nl/binnenland/het-ei-van-columbus-voor-friese-boeren-en-ook-goed-voor-het-klimaat~a4508318/'
                }
            ],
            articles: [
                {
                    'id': 1,
                    'date': 'April 2019',
                    'textLeft': true,
                    'amount': '1 nieuwsartikel',
                },
                {
                    'id': 2,
                    'date': 'Januari 2019',
                    'textLeft': false,
                    'amount': '2 nieuwsartikelen',
                },
            ]
        }
    },
    methods: {
        collapse: function(e) {
            let btnCollapse = document.querySelector('.btn-collapse');
            let content = document.querySelector('.content');
            let yLine = document.querySelector('.line-height');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                yLine.style.maxHeight = null;
                yLine.style.marginTop = null;
                content.style.marginTop = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.marginTop = '1rem';
                yLine.style.maxHeight = content.scrollHeight + "px";
                yLine.style.marginTop = '1rem';
            }
        }
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

    %btn {
        width: 100%; height: 2.8rem;
        border: none;
        font-size: 1.2rem;
        color: #fff;
        margin-top: 1.5rem;
        box-shadow: 2px 2px 8px #b1b1b1;
        cursor: pointer;
    }

    %span {
        background-color: #c5c5c5;
        position: absolute; 
        top: 2.2rem; left: 0; right: 0;
        width: 7rem; height: .1rem;
        z-index: -1;
    }
    
    #nieuwsbrief {
        padding: 1rem 5rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, auto));
        grid-column-gap: 1rem; 
        h1 { grid-column: -1/1; }
        .contentleft {
            max-width: 27rem;
            button {
                @extend %btn;
                width: 10rem;
                background-color: $blue;
                &:hover {
                    transition: all .08s linear;
                    background-color: $darkblue;
                }
            }
            .tweets {
                margin-top: 11rem;
                h2 {
                    font-size: 1.2rem;
                }
                figure {
                    display: flex;
                    align-items: baseline;
                    grid-gap: 1rem;
                    margin: 0;
                    i { color: rgb(134, 134, 134); }
                    figcaption {
                        a { 
                            color: #0EA9FA; 
                            display: table; 
                            text-decoration: none;
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }

        .contentright {
            article {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-column-gap: .5rem;
                padding-top: 1rem;
                position: relative;
                img { 
                    width: 4rem;
                    &:hover { 
                        transform: rotate(15deg);
                        transition: all .2s ease-in-out;
                    }
                }
                p { 
                    color: #7C7C7C; 
                    margin: 0; 
                    font-weight: 300;
                    letter-spacing: .5px;
                    cursor: default;
                }
                button {
                        border: none;
                        background: none;
                        width: inherit; height: inherit;
                        font-size: 0.9rem;
                        font-weight: 700;
                        color: $darkblue;
                        cursor: pointer;
                }
                span {
                    @extend %span;
                    left: 7.6rem;
                }
                .content {
                    padding: 0 18px;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.15s ease-out;
                    background-color: #f1f1f1;
                }
                .item-active { background-color: red;}
                .line-height {
                    width: 0.15rem;
                    background-color: #c5c5c5;
                    max-height: 0;
                    justify-self: center;
                }
            }
            article div:nth-child(1) { justify-self: start; align-self: center; }
            article div:nth-child(2) { justify-self: center; align-self: center;}
            article div:nth-child(2):not(.article-header) { 
                display: grid;
                justify-items: center;
                align-items: center;
                width: 100%;
                height: 2.4rem;
                background: rgb(227, 227, 227);
                cursor: pointer;
                transition: all .05s linear;
                &:hover { background: rgb(215, 215, 215); }
            }
            article div:nth-child(3) { 
                justify-self: end; align-self: center;
                position: relative;
                span {
                    @extend %span;
                    left: -8rem;
                    top: .7rem;
                }
            }
        }
    }
</style>
