<template>
    <fieldset v-if="!funderingCheck && zipcodeCheck" v-cloak id="zipcodeCheck">
        <img src="../../static/img/postcodemap.png" alt="postcodemap">
        <label for="postcodegebied">Postcodegebied: {{postcode}} - {{huisnummer}}</label>
        <p>Dit postcodegebied bevat 41 panden (BAG). Van deze panden is 100% gebouwd voor 1970. Panden gebouwd voor 1970 hebben meermaal een houten of ondiepe fundering. Deze kunnen kwetsbaar zijn, vooral waar de draagkracht van de bodem beperkt is. Dat is in dit gebied zo. Aandacht voor de aard en staat van de fundering is hier van belang, zeker in geval van concrete aanwijzingen.</p>
        <button class="btn-success" @click.prevent="goRisico">Ga verder </button>
        <a @click.prevent="backFundering">Stap terug</a>
    </fieldset>
</template>

<script>
export default {
    name: 'Foundation',
    data() {
        return {
            zipcodeCheck: true,
        }
    },
    methods: {
        goZipcode: function() {
            this.funderingCheck = false;
        },
        backZipcode: function() {
            this.zipcodeCheck = true;
        },
    }
}
</script>
