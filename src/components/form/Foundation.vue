<template>
    <fieldset v-if="funderingCheck" v-cloak id="funderingCheck">
        <h1>Op welke type fundering staat uw woning gebouwt?</h1>
        <div v-for="found in foundationOption" :key="found.id">
            <label :for="found.id" class="radiolabel"> {{ found.labelText }}
                <input type="radio" name="funderingoptie" :id="found.id">
                <span class="radiomark"></span>
            </label>
        </div>
        <button class="btn-success" @click.prevent="goZipcode">Ga verder </button>
        <a @click.prevent="backCheck">Stap terug</a>
    </fieldset>
</template>

<script>
export default {
    name: 'Foundation',
    data() {
        return {
            funderingCheck: true,
            foundationOption: [
                {
                    'id': 'wood',
                    'labelText': 'Houten palen'
                },
                {
                    'id': 'shallow',
                    'labelText': 'Ondiepe fundering'
                },
                {
                    'id': 'concrete',
                    'labelText': 'Betonnen palen'
                },
                {
                    'id': 'unknown',
                    'labelText': 'Weet ik niet'
                },
            ],
        }
    },
    methods: {
        goFundering: function() {
            this.check = false;
        }
    }
}
</script>