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
                    <h1><a :href="article.href" target="_blank">{{ article.contentTitle }}</a></h1>
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
@import '../assets/sass/extends.scss';
@import '../assets/sass/newsletter.scss';
</style>
