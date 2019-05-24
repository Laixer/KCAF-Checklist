<template>
    <fieldset v-if="!risicoCheck && !alertCheck && klachtCheck" v-cloak id="klachtCheck">
        <h1>Klacht indienen over uw woning?</h1>
        <h2>Heeft u een vrijstaand pand of is uw woning onderdeel van een (bouw)blok?</h2>
        <div>
            <label for="detached" class="radiolabel"> Vrijstaand pand
                <input type="radio" name="vrijstaand_bouwblok" id="detached">
                <span class="radiomark"></span>
            </label>
        </div>
        <div>
            <label for="buildingBlock" class="radiolabel"> Onderdeel van een (bouw)blok
                <input type="radio" name="vrijstaand_bouwblok" id="buildingBlock">
                <span class="radiomark"></span>
            </label>
        </div>
        <h2 class="mt-5">Bent u de eigenaar of de huurder van uw woning?</h2>
        <div>
            <label for="owner" class="radiolabel"> Eigenaar
                <input type="radio" name="eigenaar_huurder" id="owner">
                <span class="radiomark"></span>
            </label>
        </div>
        <div>
            <label for="tenant" class="radiolabel"> Huurder
                <input type="radio" name="eigenaar_huurder" id="tenant">
                <span class="radiomark"></span>
            </label>
        </div>
        <button class="btn-success" @click.prevent="goSchade">Ga verder </button>
        <a @click.prevent="backRisico">Stap terug</a>
    </fieldset>
</template>

<script>
export default {
    name: 'Foundation',
    data() {
        return {
            klachtCheck: true,
        }
    },
    methods: {
        goKlacht: function() {
            this.klachtCheck = true;
            this.risicoCheck = false;
            this.alertCheck = false;
            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.add('center');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },
        backKlacht: function() {
            this.klachtCheck = true;
        },
    }
}
</script>