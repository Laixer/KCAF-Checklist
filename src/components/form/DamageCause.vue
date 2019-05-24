<template>
    <fieldset v-if="!klachtCheck && schadeCheck" v-cloak id="schadeCheck">
        <h1>Wat veroorzaakt de schade in uw woning?</h1>
        <div v-for="damage in damages" :key="damage.id">
            <div>
                <label :for="damage.id" class="radiolabel"> {{ damage.labelText }}
                    <input type="radio" name="schadeveroorzaking" :id="damage.id" @change="enableText">
                    <input type="text" id="inputDamage" v-if="damage.inputField" disabled>
                    <span class="radiomark"></span>
                </label>
            </div>
        </div>
        <button class="btn-success" @click.prevent="goHerken">Ga verder </button>
        <a @click.prevent="backKlacht">Stap terug</a>
    </fieldset>
</template>

<script>
export default {
    name: 'Foundation',
    data() {
        return {
            schadeCheck: true,
            damages: [
                {
                    'id': 'wrongFunding',
                    'labelText': 'Verkeerd gefundeerd bij bouw van de woning'
                },
                {
                    'id': 'fungiBacteria',
                    'labelText': 'Aantasting van houten palen door schimmels of bacteriën'
                },
                {
                    'id': 'pushedUp',
                    'labelText': 'Woning wordt van de funderingspalen omhoog gedrukt'
                },
                {
                    'id': 'pulledDown',
                    'labelText': 'Funderingspalen worden naar beneden getrokken'
                },
                {
                    'id': 'subsidence',
                    'labelText': 'Bodemdaling'
                },
                {
                    'id': 'weight',
                    'labelText': 'Fundering niet meer berekend op huidige gewicht'
                },
                {
                    'id': 'plantRoots',
                    'labelText': 'Beschadiging fundering door (planten)wortels '
                },
                {
                    'id': 'other',
                    'labelText': 'Iets anders, namelijk:',
                    'inputField': true
                },
                {
                    'id': 'unknown',
                    'labelText': 'Weet ik niet'
                },
            ],
        }
    },
    methods: {
        goSchade: function() {
            this.schadeCheck = true;
            this.klachtCheck = false;
        },
        backSchade: function() {
            this.schadeCheck = true;
        },
        enableText: function(e) {
            let inputDamage = document.querySelector('#inputDamage');
            if (e.target.id === "other") {
                inputDamage.disabled = false;
                inputDamage.focus({preventScroll:false});
            } else {
                inputDamage.disabled = true;
            }
        },
    }
}
</script>