<template>
    <fieldset v-if="check" id="check">
        <legend><span></span> Doe de check</legend>
        <label for="postcode">Postcode </label>
        <input type="text" id="postcode" v-model="zipcode" placeholder="1000XX">
        <label for="huisnummer">Huisnummer </label>
        <input type="text" v-model="housenumber" id="huisnummer" placeholder="1A">
        <button class="btn-success" @click.prevent="goFundering">Ga verder </button>
    </fieldset>
</template>

<script>
/* eslint-disable */
import Foundation from './Foundation.vue';
export default {
    name: 'Location',
    components: {
      Foundation
    },
    data() {
        return {
            zipcode: "",
            housenumber: "",
            check: true,
        }
    },
    methods: {
        backCheck: function() {
            this.check = true;
            this.funderingCheck = false;
        },
    }
}
</script>
