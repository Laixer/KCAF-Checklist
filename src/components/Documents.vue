<template>
    <section id="documents">
        <h1>Neem een kijk aan onze documenten</h1>
        <div class="figures">
            <figure v-for="doc in documents" :key="doc.id">
                <img :src="require('../../vendor/'+ brand +'/img/' + doc.image)" :alt="doc.altText">
                <figcaption>
                    <p>{{ doc.title }}</p>
                </figcaption>
            </figure>
        </div>
    </section>
</template>

<script>
const brand = process.env.VUE_APP_BRAND;
const docs = require('../../vendor/'+ brand +'/documents.json');
export default {
    name: 'Documents',
    data() {
        return {
            documents: docs.documents,
            brand: brand,
        }
    }
}
</script>

<style lang="scss">
@import '../assets/sass/extends.scss';
@import '../assets/sass/documents.scss';
</style>
