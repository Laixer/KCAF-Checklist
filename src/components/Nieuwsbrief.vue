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
            <article>
                <div></div>
                <div class="article-header"><img src="../../static/img/nieuwsbrief-textbubble.png" alt="nieuwsbrief-textbubble">
                </div>
                <div></div>
            </article>
            <article v-for="article in articles" :key="article.id">
                <div>
                    <p v-if="article.textLeft">{{article.amount}} nieuwsartikel <span></span></p>
                </div>
                <div><button class="btn-collapse" @click="article.show = !article.show"> {{article.date}}</button></div>
                <div>
                    <p v-if="article.textLeft == false">{{article.amount}} nieuwsartikel<span></span></p>
                </div>
                <div class="content" v-show="article.show"> 
                    <h1><a :href="article.href">{{ article.contentTitle }}</a></h1>
                    <p>{{ article.contentText }}</p>
                </div>
                <div class="line-height" v-show="article.show"></div>
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
                    'amount': 1,
                    'contentTitle': 'Kaart meldingen funderingsschade bij KCAF – April 2019',
                    'contentText': 'Sinds de droge zomer van 2018 is het aantal meldingen van funderingsschade bij het funderingsloket van het KCAF, sterk toegenomen...',
                    'href': 'https://www.kcaf.nl/kaart-meldingen-funderingsschade-bij-kcaf-april-2019/',
                    'show': false,
                },
                {
                    'id': 2,
                    'date': 'Januari 2019',
                    'textLeft': false,
                    'amount': 2,
                    'contentTitle': 'dd',
                    'contentText': 'Lorem ipsum',
                    'href': '#',
                    'show': false,
                },
                {
                    'id': 3,
                    'date': 'Juli 2018',
                    'textLeft': true,
                    'amount': 5,
                    'contentTitle': 'Content 3',
                    'contentText': 'Lorem ipsum',
                    'href': '#',
                    'show': false,
                },
                {
                    'id': 4,
                    'date': 'Juni 2018',
                    'textLeft': false,
                    'amount': 8,
                    'contentTitle': 'Content 4',
                    'contentText': 'Lorem ipsum',
                    'href': '#',
                    'show': false,
                },
                {
                    'id': 5,
                    'date': 'Mei 2018',
                    'textLeft': true,
                    'amount': 1,
                    'contentTitle': 'Content 5',
                    'contentText': 'Lorem ipsum',
                    'href': '#',
                    'show': false,
                },
                {
                    'id': 6,
                    'date': 'April 2018',
                    'textLeft': false,
                    'amount': 3,
                    'contentTitle': 'Content 6',
                    'contentText': 'Lorem ipsum',
                    'href': '#',
                    'show': false,
                },
                {
                    'id': 7,
                    'date': 'November 2017',
                    'textLeft': true,
                    'amount': 1,
                    'contentTitle': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    'contentText': 'Lorem ipsum',
                    'href': '#',
                    'show': false,
                },
                {
                    'id': 8,
                    'date': 'Oktober 2017',
                    'textLeft': false,
                    'amount': 1,
                    'contentTitle': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    'contentText': 'Lorem ipsum',
                    'href': '#',
                    'show': false,
                },
            ]
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
        width: 7rem; height: 1px;
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
                        min-width: 15rem; height: inherit;
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
                    padding: 1rem 1.6rem 1.7rem 1.5rem;;
                    max-width: 15rem;
                    background-color: #fff;
                    margin: 3rem 0;
                    border: 1px solid #e8e8e8;
                    &:hover {
                        box-shadow: 0px 0px 28px -4px #c5c5c5;
                        transition: all .2s linear;
                    }
                    h1 {
                        font-size: 0.9rem;
                        a { 
                            color: $darkblue; 
                            text-decoration: none;
                            &:hover { color: $blue; }
                        }
                    }
                    p { font-size: 0.8rem; color: rgb(43, 43, 43); }
                }
                .line-height {
                    width: 2px;
                    margin-top: 1rem;
                    background-color: #c5c5c5;
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
