<template>
    <fieldset v-if="!schadeCheck && herkenCheck" v-cloak id="herkenCheck">
        <h1>Herken je éen van de volgende punten in uw woning?</h1>
        <p>Meerdere opties mogelijk</p>
        <div v-for="last in lasten" :key="last.id" @change="enableTextCheckbox">
            <div>
                <label :for="last.id" class="radiolabel"> {{ last.labelText }}
                    <input type="checkbox" name="lasten" :id="last.id">
                    <input type="text" id="inputLast" v-if="last.inputField" disabled>
                    <span class="radiomark"></span>
                </label>
            </div>
        </div>
        <button class="btn-success" @click.prevent="goUpload">Ga verder </button>
        <a @click.prevent="backSchade">Stap terug</a>
    </fieldset>
</template>

<script>
export default {
    name: 'Foundation',
    data() {
        return {
            herkenCheck: true,
            lasten: [
                {
                    'id': 'clamping',
                    'labelText': 'Ik heb last van klemmende deuren en/of ramen'
                },
                {
                    'id': 'rip',
                    'labelText': 'Er zit een scheur in mijn muur/gevel'
                },
                {
                    'id': 'crooked',
                    'labelText': 'Mijn woning staat wat scheef'
                },
                {
                    'id': 'highWater',
                    'labelText': 'Er is sprake van hoog water in de kruipruimte'
                },
                {
                    'id': 'entrance',
                    'labelText': 'De drempel van de entree ligt hoger dan het trottoir/weg'
                },
                {
                    'id': 'myHome',
                    'labelText': 'De drempel van mijn woning ligt lager dan het trottoir/weg'
                },
                {
                    'id': 'floorsWalls',
                    'labelText': 'Er is sprake van scheve vloeren/muren in mijn woning'
                },
                {
                    'id': 'otherCheckbox',
                    'labelText': 'Iets anders, namelijk:',
                    'inputField': true
                },
                {
                    'id': 'nothing',
                    'labelText': 'Ik herken niets'
                }
            ],
        }
    },
    methods: {
        goHerken: function() {
            this.schadeCheck = false;
            this.herkenCheck = true;
        },
        backHerken: function() {
            this.herkenCheck = true;
        },
        enableTextCheckbox: function(e) {
            let inputLast = document.querySelector('#inputLast');
            let otherCheckbox = document.querySelector('#otherCheckbox');
            if (e.target.id === "otherCheckbox") {
                if (otherCheckbox.checked) {
                    inputLast.disabled = false;
                    inputLast.focus({preventScroll:false});
                }
                else {
                    inputLast.disabled = true;
                }
            }
        },
    }
}
</script>