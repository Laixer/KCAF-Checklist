<template>
    <section id="home">
        <form action="" class="check" id="checkForm" method="POST">
            <fieldset v-if="check" id="check">
                <legend><span></span> Doe de check</legend>
                <label for="postcode">Postcode </label>
                <input type="text" id="postcode" v-model="postcode" placeholder="1000XX">
                <label for="huisnummer">Huisnummer </label>
                <input type="text" v-model="huisnummer" id="huisnummer" placeholder="1A">
                <button class="btn-success" @click.prevent="goFundering">Ga verder </button>
            </fieldset>
            <fieldset v-if="!check && funderingCheck" v-cloak id="funderingCheck">
                <h1>Op welke type fundering staat uw woning gebouwt?</h1>
                <div v-for="found in foundation" :key="found.id">
                    <label :for="found.id" class="radiolabel"> {{ found.labelText }}
                        <input type="radio" name="funderingoptie" :id="found.id">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <button class="btn-success" @click.prevent="goZipcode">Ga verder </button>
                <a @click.prevent="backCheck">Stap terug</a>
            </fieldset>
            <fieldset v-if="!funderingCheck && zipcodeCheck" v-cloak id="zipcodeCheck">
                <img src="../../static/img/postcodemap.png" alt="postcodemap">
                <label for="postcodegebied">Postcodegebied: {{postcode}} - {{huisnummer}}</label>
                <p>Dit postcodegebied bevat 41 panden (BAG). Van deze panden is 100% gebouwd voor 1970. Panden gebouwd voor 1970 hebben meermaal een houten of ondiepe fundering. Deze kunnen kwetsbaar zijn, vooral waar de draagkracht van de bodem beperkt is. Dat is in dit gebied zo. Aandacht voor de aard en staat van de fundering is hier van belang, zeker in geval van concrete aanwijzingen.</p>
                <button class="btn-success" @click.prevent="goRisico">Ga verder </button>
                <a @click.prevent="backFundering">Stap terug</a>
            </fieldset>
            <fieldset v-if="!zipcodeCheck && risicoCheck" v-cloak id="risicoCheck">
                <h1>U loopt mogelijk een risico</h1>
                <img src="../../static/img/warning.png" alt="warning">
                <p>Wilt u een klacht indienen over uw woning?</p>
                <button class="btn-white" @click.prevent="goKlacht">Ja </button>
                <button class="btn-grey" @click.prevent="goAlert">Nee </button>
                <a @click.prevent="backZipcode">Stap terug</a>
            </fieldset>
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
            <fieldset v-if="!risicoCheck && !klachtCheck && !schadeCheck && alertCheck" v-cloak id="alertCheck">
                <p><b>Blijf alert.</b> Neem situaties die kunnen wijzen op funderingsproblemen altijd serieus. Want alle soorten funderingen kunnen in de loop der jaren door verschillende factoren te maken krijgen met problemen. </p><p class="newline"> Neem een kijk in onze documenten om verdere funderingsproblemen te voorkomen.</p>
                <button class="btn-success" @click.prevent="documenten"> Bekijk documenten</button>
                <a @click.prevent="backRisico">Stap terug</a>
            </fieldset>
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
            <fieldset v-if="!herkenCheck && uploadCheck" v-cloak id="uploadCheck" @change="enableFileUpload">
                <h1>Heeft u een onderzoeksrapport beschikbaar?</h1>
                <div class="mt-3">
                    <label for="researchYes" class="radiolabel"> Ja
                        <input type="radio" name="onderzoeksrapport" id="researchYes">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <div class="upload-container" @drop.prevent="dropHandler" @dragover.prevent="dragOverHandler">
                    <input type="file" name="uploadrapport" id="uploadReport" disabled>
                    <p class="filetext">Sleep het bestand hier</p>
                    <img src="../../static/img/upload-button.png" alt="upload-button">
                    <label class="btn-darkblue btn-disabled" for="uploadReport">Of selecteer een bestand</label>
                </div>
                <div class="mt-5">
                    <label for="researchNo" class="radiolabel"> Nee
                        <input type="radio" name="onderzoeksrapport" id="researchNo">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <button class="btn-success" @click.prevent="goAdvise">Ga verder </button>
                <a @click.prevent="backHerken">Stap terug</a>
            </fieldset>
            <fieldset v-if="!uploadCheck && advise" v-cloak id="advise">
                <h1>Herken je éen van de volgende punten in uw woning?</h1>
                <p>Meerdere opties mogelijk</p>
                <button class="btn-success" @click.prevent="">Terug naar het begin </button>
                <a @click.prevent="backUpload">Stap terug</a>
            </fieldset>
        </form>
        <article>
            <h1>Wie zijn wij?</h1>
            <p v-cloak> {{ introduction }} </p>
        </article>
    </section>
</template>

<script>
/* eslint-disable */
const $ = require("jquery");

$( document ).ready(function() { 
		$(window).scroll(function() { 
		    var Scroll = $(window).scrollTop() + 1,
                SectionOneOffset = $('#pageTop').offset().top,
                SectionTwoOffset = $('#documenten').offset().top,
                SectionThreeOffset = $('#nieuwsbrief').offset().top;

		    if (Scroll >= SectionOneOffset) {
		        $(".menu-item-1").addClass("active");
		    } else {
		        $(".menu-item-1").removeClass("active");
		    }
			if (Scroll >= SectionTwoOffset) {
		        $(".menu-item-2").addClass("active");
				$(".menu-item-1").removeClass("active");
		    } else {
		        $(".menu-item-2").removeClass("active");
		    }
			if (Scroll >= SectionThreeOffset) {
		        $(".menu-item-3").addClass("active");
				$(".menu-item-2").removeClass("active");
		    } else {
		        $(".menu-item-3").removeClass("active");
		    }
		});
});

export default {
    name: 'Home',
    data () {
        return {
            postcode: "",
            huisnummer: "",
            check: true,
            funderingCheck: true,
            zipcodeCheck: true,
            risicoCheck: true,
            klachtCheck: true,
            alertCheck: true,
            schadeCheck: true,
            herkenCheck: true,
            uploadCheck: true,
            advise: true,
            introduction: 'Stichting Kennis Centrum Aanpak Funderingsproblematiek (KCAF) is een stichting met als doelstelling het verzamelen, ontwikkelen en ontsluiten van kennis rond de aanpak en preventie van funderingsproblemen. KCAF fungeert als nationaal funderingsloket voor alle vragen rond deze problematiek. Van funderingsonderzoek tot funderingsherstel, van aanpak tot financiering, van preventie tot innovatie. Deze doelstelling willen we samen met vakmensen en eigen medewerkers bereiken. KCAF is een stichting zonder winstoogmerk.',
            foundation: [
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
        backCheck: function() {
            this.check = true;
        },

        goFundering: function() {
            this.check = false;
        },
        backFundering: function() {
            this.funderingCheck = true;
        },

        goZipcode: function() {
            this.funderingCheck = false;
        },
        backZipcode: function() {
            this.zipcodeCheck = true;
        },

        goRisico: function() {
            this.zipcodeCheck = false;
        },
        backRisico: function() {
            this.risicoCheck = true;
            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.remove('center');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },

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

        goHerken: function() {
            this.schadeCheck = false;
            this.herkenCheck = true;
        },
        backHerken: function() {
            this.herkenCheck = true;
        },

        goUpload: function() {
            this.herkenCheck = false;
            this.uploadCheck = true;
        },
        backUpload: function() {
            this.uploadCheck = true;
        },
        enableFileUpload: function(e) {
            let uploadContainer = document.querySelector('.upload-container');
            let uploadReport = document.querySelector('#uploadReport');
            let fileButton = document.querySelector('.btn-disabled');
            let dragText = document.querySelector('.filetext');
            if (e.target.id === "researchYes") {
                uploadContainer.style.border = "2px dashed #39434E";
                uploadReport.disabled = false;
                fileButton.classList.add("button-enabled");
                dragText.style.color = '#39434E';
            } else {
                uploadContainer.style.border = "2px dashed #bfbdbd";
                uploadReport.disabled = true;
                fileButton.classList.remove("button-enabled");
                dragText.style.color = '#bfbdbd';
            }
        },
        dropHandler: function(e) {
            if (e.dataTransfer.items) {
                for (let i = 0; i < e.dataTransfer.items.length; i++) {
                    if (e.dataTransfer.items[i].kind === 'file') {
                        let file = e.dataTransfer.items[i].getAsFile();
                        // eslint-disable-next-line
                        document.querySelector('.filetext').innerHTML = file.name;
                        document.querySelector('.filetext').style.color = "#28ABE3";
                        document.querySelector('.upload-container').classList.remove('file-adding');
                    }
                }
            }
        },
        dragOverHandler: function(e) {
            if (e) {
                document.querySelector('.filetext').innerHTML = "Afbeelding uploaden...";
                document.querySelector('.upload-container').classList.add('file-adding');
            }
        },

        goAdvise: function() {
            this.uploadCheck = false;
            this.advise = true;
        },

        goAlert: function() {
            this.alertCheck = true;
            this.risicoCheck = false;
            this.herkenCheck = false;
            this.klachtCheck = false;
            this.schadeCheck = false;
            this.uploadCheck = false;
            this.advise = false;
        },

        documenten: function() {
            location.href = "#documenten";
        },
    }
}
</script>

<style lang="scss">
    @import '../assets/sass/extends.scss';
    @import '../assets/sass/home.scss';
</style>