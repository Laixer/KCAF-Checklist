<template>
    <section id="newsletter">
        <h1>Digitale Nieuwsbrief</h1>
        <div class="contentleft">
            <p>
                {{ introText }}
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
const text = require('../../vendor/'+[process.env.VUE_APP_BRAND]+'/text.json');
export default {
    name: 'Newsletter',
    data() {
        return {
            introText: text.newsletter.introText,
            tweets: text.newsletter.tweets,
            articles: text.newsletter.articles,
        }
    }
}
</script>

<style lang="scss">
@import '../assets/sass/extends.scss';
@import '../assets/sass/newsletter.scss';
</style>
