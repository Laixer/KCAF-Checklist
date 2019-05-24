<template>
    <fieldset v-if="!zipcodeCheck && risicoCheck" v-cloak id="risicoCheck">
        <h1>U loopt mogelijk een risico</h1>
        <img src="../../static/img/warning.png" alt="warning">
        <p>Wilt u een klacht indienen over uw woning?</p>
        <button class="btn-white" @click.prevent="goKlacht">Ja </button>
        <button class="btn-grey" @click.prevent="goAlert">Nee </button>
        <a @click.prevent="backZipcode">Stap terug</a>
    </fieldset>
</template>

<script>
export default {
    name: 'Foundation',
    data() {
        return {
            risicoCheck: true,
        }
    },
    methods: {
        goRisico: function() {
            this.zipcodeCheck = false;
        },
        backRisico: function() {
            this.risicoCheck = true;
            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.remove('center');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },
    }
}
</script>
