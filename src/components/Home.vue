<template>
    <section id="home">
        <div id="page-mask"></div>
        <form action="" class="check" id="checkForm" method="POST">

            <fieldset v-if="check" id="check">
                <legend><span></span> Melding maken voor adres: </legend>
                <div class="form-group">
                    <div class="form-input">
                        <label for="postcode">Postcode </label>
                        <input type="text" id="postcode" v-model="zipcode" placeholder="1000XX">
                    </div>
                    <div class="form-input">
                        <label for="huisnummer">Huisnummer </label>
                        <input type="text" v-model="housenumber" id="huisnummer" placeholder="1A">
                    </div> 
                </div>
                <div class="address-box">
                    <h3>Adres</h3>
                    <p>Hudsonstraat 15-1</p>
                    <p>1057RW Amsterdam</p>
                </div>
                <p v-if="errors.length"><b>Een of meer fouten zijn voorgekomen:</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <button class="btn-success" @click.prevent="goFoundation">Ga verder </button>
            </fieldset>

            <fieldset v-if="!check && foundationCheck" v-cloak id="foundationCheck">
                <h2>Op welke type fundering is de woning gebouwd?</h2>
                <div v-for="found in foundationOption" :key="found.id">
                    <label :for="found.id" class="radiolabel"> {{ found.labelText }}
                        <input type="radio" name="funderingoptie" :id="found.id">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <p v-if="errors.length"><b>Een of meer fouten zijn voorgekomen:</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <button class="btn-success" @click.prevent="goComplaint">Ga verder </button>
                <a @click.prevent="backCheck">Stap terug</a>
            </fieldset>

            <!-- <fieldset v-if="!foundationCheck && zipcodeCheck" v-cloak id="zipcodeCheck">
                <div>
                    <img src="../../static/img/postcodemap.png" id="mapImage" alt="postcodemap">
                    <button class="btn-expand" @click.prevent="resizeMap"><i class="fas fa-expand"></i></button>
                </div>
                <label for="postcodegebied">Postcodegebied: {{zipcode}} - {{housenumber}}</label>
                <p class="img-description">Dit postcodegebied bevat 41 panden (BAG). Van deze panden is 100% gebouwd voor 1970. Panden gebouwd voor 1970 hebben meermaal een houten of ondiepe fundering. Deze kunnen kwetsbaar zijn, vooral waar de draagkracht van de bodem beperkt is. Dat is in dit gebied zo. Aandacht voor de aard en staat van de fundering is hier van belang, zeker in geval van concrete aanwijzingen.</p>
                <button class="btn-success" @click.prevent="goRisk">Ga verder </button>
                <a @click.prevent="backFoundation">Stap terug</a>
            </fieldset> -->

            <!-- <fieldset v-if="!foundationCheck && riskCheck" v-cloak id="riskCheck">
                <h2>U loopt mogelijk een risico</h2>
                <img src="../../static/img/warning.png" alt="warning">
                <p>Wilt u een klacht indienen over uw woning?</p>
                <button class="btn-white" @click.prevent="goComplaint">Ja </button>
                <button class="btn-grey" @click.prevent="goAlert">Nee </button>
                <a @click.prevent="backZipcode">Stap terug</a>
            </fieldset> -->

            <fieldset v-if="!foundationCheck && complaintCheck" v-cloak id="complaintCheck">
                <h2>Melding maken voor {{zipcode}} - {{housenumber}}</h2>
                <h3>Heeft u een vrijstaand pand of is uw woning onderdeel van een (bouw)blok?</h3>
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
                <h3 class="mt-2">Bent u de eigenaar of de huurder van uw woning?</h3>
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
                <h3 class="mt-2">Is bij een van uw directe buren funderingsherstel uitgevoerd?</h3>
                <div>
                    <label for="repairYes" class="radiolabel"> Ja
                        <input type="radio" name="funderingsherstel" id="repairYes">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <div>
                    <label for="repairNo" class="radiolabel"> Nee
                        <input type="radio" name="funderingsherstel" id="repairNo">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <p v-if="errors.length"><b>Een of meer fouten zijn voorgekomen:</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <button class="btn-success" @click.prevent="goDamage">Ga verder </button>
                <a @click.prevent="backFoundation">Stap terug</a>
            </fieldset>

            <!-- <fieldset v-if="!riskCheck && !complaintCheck && !damageCheck && alertCheck" v-cloak id="alertCheck">
                <p><b>Blijf alert.</b> Neem situaties die kunnen wijzen op funderingsproblemen altijd serieus. Want alle soorten funderingen kunnen in de loop der jaren door verschillende factoren te maken krijgen met problemen. </p><p class="newline"> Neem een kijk in onze documents om verdere funderingsproblemen te voorkomen.</p>
                <button class="btn-success" @click.prevent="documents"> Bekijk documents</button>
                <a @click.prevent="backRisk">Stap terug</a>
            </fieldset> -->

            <fieldset v-if="!complaintCheck && damageCheck" v-cloak id="damageCheck">
                <h2>Wat veroorzaakt de schade in uw woning?</h2>
                <div v-for="damage in damages" :key="damage.id">
                    <div>
                        <label :for="damage.id" class="radiolabel"> {{ damage.labelText }}
                            <input type="radio" name="schadeveroorzaking" :id="damage.id" @change="enableText">
                            <input type="text" id="inputDamage" v-if="damage.inputField" disabled>
                            <span class="radiomark"></span>
                        </label>
                    </div>
                </div>
                <p v-if="errors.length"><b>Een of meer fouten zijn voorgekomen:</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <button class="btn-success" @click.prevent="goRecog">Ga verder </button>
                <a @click.prevent="backComplaint">Stap terug</a>
            </fieldset>
            
            <fieldset v-if="!damageCheck && recogCheck" v-cloak id="recogCheck" @change="adviseText">
                <h2>Herken je éen van de volgende punten in uw woning?</h2>
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
                <button class="btn-success" @click.prevent="goSurrounding">Ga verder </button>
                <a @click.prevent="backDamage">Stap terug</a>
            </fieldset>

            <fieldset v-if="!recogCheck && surroundingCheck" v-cloak id="surroundingCheck">
                <h2>Klachten ten aanzien van de omgeving?</h2>
                <p>Meerdere opties mogelijk</p>
                <div v-for="surround in surrounding" :key="surround.id" @change="enableTextCheckbox">
                    <div>
                        <label :for="surround.id" class="radiolabel"> {{ surround.labelText }}
                            <input type="checkbox" name="surrounding" :id="surround.id">
                            <input type="text" id="inputLast" v-if="surround.inputField" disabled>
                            <span class="radiomark"></span>
                        </label>
                    </div>
                </div>
                <button class="btn-success" @click.prevent="goUpload">Ga verder </button>
                <a @click.prevent="backRecog">Stap terug</a>
            </fieldset>

            <fieldset v-if="!surroundingCheck && uploadCheck" v-cloak id="uploadCheck" @change="enableFileUpload">
                <h2>Heeft u een onderzoeksrapport beschikbaar?</h2>
                <div class="mt-3">
                    <label for="researchYes" class="radiolabel"> Ja
                        <input type="radio" name="onderzoeksrapport" id="researchYes" checked>
                        <span class="radiomark"></span>
                    </label>
                </div>
                <div class="upload-container" @drop.prevent="dropHandler" @dragover.prevent="dragOverHandler">
                    <input type="file" name="uploadrapport" id="uploadReport">
                    <p class="filetext">Sleep het bestand hier</p>
                    <img src="../../static/img/upload-button.png" alt="upload-button">
                    <label class="btn-secondary btn-toggle" for="uploadReport">Of selecteer een bestand</label>
                </div>
                <div class="mt-5">
                    <label for="researchNo" class="radiolabel"> Nee
                        <input type="radio" name="onderzoeksrapport" id="researchNo">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <button class="btn-success" @click.prevent="goAdvise">Ga verder </button>
                <a @click.prevent="backSurrounding">Stap terug</a>
            </fieldset>

            <fieldset v-if="!uploadCheck && advise" v-cloak id="advise">
                <h2>Advies</h2>
                <h3>Funderingsonderzoek</h3>
                <p v-if="recogCheckNothing == false">Wij adviseren u in het (laten) uitvoeren van aanvullend onderzoek. In ons stappenplan leggen wij duidelijk uit welke stappen u kunt nemen en voor welke stappen professionele hulp noodzakelijk is.</p>
                <p v-else>U heeft vermoedelijk geen funderingsprobleem. Indien u toch twijfelt raden wij u aan ons stappenplan voor het achterhalen van Funderingsproblematiek te bekijken.</p>
                <a class="stappenplan" href="https://www.kcaf.nl/stappenplan-funderingsherstel/" target="_blank">Bekijk het hele stappenplan <i class="fas fa-external-link-alt"></i></a>
                <section class="user_data">
                    <h2>Laat uw gegevens bij ons achter</h2>
                    <p>Dit is niet verplicht</p>
                    <div class="form-group">
                        <label for="user_name">Naam</label>
                        <input type="text" name="user_name" id="user_name" v-model="userName">
                    </div>
                    <div class="form-group">
                        <label for="user_email">Email</label>
                        <input type="text" name="user_email" id="user_email" v-model="userEmail">
                    </div>
                    <div class="form-group">
                        <label for="user_phonenumber">Telefoonnummer</label>
                        <input type="text" name="user_phonenumber" id="user_phonenumber" v-model="userPhonenumber">
                    </div>
                </section>
                <button class="btn-success" @click.prevent="goCheck">Terug naar het begin </button>
                <a @click.prevent="backUpload">Stap terug</a>
            </fieldset>

        </form>
        <article>
            <h1>Wie zijn wij?</h1>
            <p v-cloak> {{ introText }} </p>
        </article>
    </section>
</template>

<script>
/* eslint-disable */
import Location from './form/Location.vue';
import Foundation from './form/Foundation.vue';

const text = require('../../vendor/'+[process.env.VUE_APP_BRAND]+'/text.json');

const $ = require("jquery");

$( document ).ready(function() { 
		$(window).scroll(function() { 
		    let Scroll = $(window).scrollTop() + 1,
                SectionOneOffset = $('#pageTop').offset().top,
                SectionTwoOffset = $('#documents').offset().top,
                SectionThreeOffset = $('#newsletter').offset().top;

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
    components: {
        Location,
        Foundation,
    },
    data () {
        return {
            introText: text.introText,
            errors: [],
            zipcode: null,
            housenumber: null,
            userName: null,
            userEmail: null,
            userPhonenumber: null,
            check: true,
            foundationCheck: true,
            // zipcodeCheck: true,
            // riskCheck: true,
            // alertCheck: true,
            complaintCheck: true,
            damageCheck: true,
            recogCheck: true,
            recogCheckNothing: false,
            surroundingCheck: true,
            uploadCheck: true,
            advise: true,
            introduction: 'Stichting Kennis Centrum Aanpak Funderingsproblematiek (KCAF) is een stichting met als doelstelling het verzamelen, ontwikkelen en ontsluiten van kennis rond de aanpak en preventie van funderingsproblemen. KCAF fungeert als nationaal funderingsloket voor alle vragen rond deze problematiek. Van funderingsonderzoek tot funderingsherstel, van aanpak tot financiering, van preventie tot innovatie. Deze doelstelling willen we samen met vakmensen en eigen medewerkers bereiken. KCAF is een stichting zonder winstoogmerk.',
            foundationOption: [
                {
                    'id': 'wood',
                    'labelText': 'Houten palen'
                },
                {
                    'id': 'shallow',
                    'labelText': 'Ondiepe fundering (op staal)'
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
                    'labelText': 'Beschadiging fundering door (planten)wortels'
                },
                {
                    'id': 'gasExtraction',
                    'labelText': 'Gaswinning'
                },
                {
                    'id': 'traffic',
                    'labelText': 'Verkeer nabij het pand'
                },
                {
                    'id': 'repairNeighbour',
                    'labelText': 'Funderingsherstel bij de buren'
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
                    'labelText': 'De drempel van de woning ligt hoger dan het trottoir/weg'
                },
                {
                    'id': 'myHome',
                    'labelText': 'De drempel van de woning ligt lager dan het trottoir/weg'
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
                    'labelText': 'Ik herken niets',
                }
            ],
            surrounding: [
                {
                    'id': 'subsidenceGarden',
                    'labelText': 'Is er sprake van bodemdaling tuin/erf?'
                },
                {
                    'id': 'sewerConnection',
                    'labelText': 'Heeft u last van verzakkende rioolaansluitingen?'
                },
                {
                    'id': 'cables',
                    'labelText': 'Heeft u last van verzakkende kabels/leidingen'
                },
                {
                    'id': 'flooding',
                    'labelText': 'Heeft u wateroverlast?'
                },
                {
                    'id': 'underload',
                    'labelText': 'Heeft u wateronderlast / droge bodem?'
                },
                {
                    'id': 'leakingSewage',
                    'labelText': 'Is er sprake van lekkende riolering in de straat?'
                },
                {
                    'id': 'blockSignals',
                    'labelText': 'Zijn er woningen in uw bouwblok / buurt met signalen van funderingsproblemen?'
                },
                {
                    'id': 'elevatedStreet',
                    'labelText': 'Is de straat waarin de woning ligt onlangs opgehoogd?'
                },
                {
                    'id': 'increasingTraffic',
                    'labelText': 'Is er sprake van toenemend verkeer in uw straat?'
                },
                {
                    'id': 'constActivities',
                    'labelText': 'Vinden er in de directe omgeving bouwactiviteiten plaats?'
                },
                {
                    'id': 'largeTrees',
                    'labelText': 'Staan er grote bomen nabij de woning?'
                },
                {
                    'id': 'otherCheckbox',
                    'labelText': 'Iets anders, namelijk:',
                    'inputField': true
                },
            ]
        }
    },
    methods: {
        goCheck: function() {
            this.check = true;
            this.advise = false;
            
            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.remove('center');
            document.querySelector('#app').classList.remove('darken');
            document.querySelector('#page-mask').classList.remove('active');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },
        backCheck: function() {
            this.check = true;
            this.errors = [];
        },

        goFoundation: function() {
            let zipField = document.querySelector('#postcode');
            let hnrField = document.querySelector('#huisnummer')
            this.errors = [];

/*          let checkForm = document.querySelector('#checkForm');
            checkForm.classList.add('center');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"}); */

            if (!this.zipcode) {
                this.errors.push('Postcode is verplicht.');
                zipField.style.borderBottom = '1px solid #ff2222';
                hnrField.style.borderBottom = '1px solid #004265';
            } else if (!this.validZipcode(this.zipcode)) {
                this.errors.push('Geen geldige Postcode');
                zipField.style.borderBottom = '1px solid #ff2222';
                if (hnrField.value == '' || !this.validHousenumber(this.housenumber)) {
                    hnrField.style.borderBottom = '1px solid #ff2222';
                } else {
                    hnrField.style.borderBottom = '1px solid #004265';
                }
            }
            if (!this.housenumber) {
                this.errors.push('Huisnummer is verplicht.');
                hnrField.style.borderBottom = '1px solid #ff2222';
                if (zipField.value == '' || !this.validZipcode(this.zipcode)) {
                    zipField.style.borderBottom = '1px solid #ff2222';
                } else {
                    zipField.style.borderBottom = '1px solid #004265';
                }
            } else if (!this.validHousenumber(this.housenumber)) {
                this.errors.push('Geen geldige Huisnummer');
                hnrField.style.borderBottom = '1px solid #ff2222';
                if (zipField.value == '' || !this.validZipcode(this.zipcode)) {
                    zipField.style.borderBottom = '1px solid #ff2222';
                } else {
                    zipField.style.borderBottom = '1px solid #004265';
                }
            } 

            if (this.errors.length) {
                document.querySelector('form').style.height = 'auto';
            } else {
                this.check = false;
                this.foundationCheck = true;
            }
        },
        validZipcode: function(zipcode) {
            let regex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
            return regex.test(zipcode);
        },
        validHousenumber: function(housenumber) {
            let regex = /^([0-9]){1,}([A-Za-z]){0,3}$/;
            return regex.test(housenumber);
        },
        backFoundation: function() {
            this.foundationCheck = true;

            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.remove('center');
            document.querySelector('#app').classList.remove('darken');
            document.querySelector('#page-mask').classList.remove('active');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },

    /*  goZipcode: function() {
            let form = document.querySelector('#foundationCheck');
            let radios = form.querySelectorAll('input');
            this.errors = [];

            if (!this.validateRadio(radios)) {
                this.errors.push('Geen optie geselecteerd.');
                document.querySelector('form').style.height = 'auto';
            } else {
                
                this.foundationCheck = false;
            }
        },
        backZipcode: function() {
            this.zipcodeCheck = true;
            this.errors = [];
        },
        resizeMap: function(e) {
            let mapImg = document.querySelector('#mapImage');
            let imgDescription = document.querySelector('.img-description');
            let resizeBtn = document.querySelector('.btn-expand');
            mapImg.classList.toggle('map-resize');
            if (mapImg.className == 'map-resize') {
                imgDescription.innerHTML = '<b>41</b> panden waarvan <b>100%</b> gebouwd voor 1970';   
                resizeBtn.innerHTML = '<i class="fas fa-compress"></i>'
            } else {
                imgDescription.innerHTML = 'Dit postcodegebied bevat 41 panden (BAG). Van deze panden is 100% gebouwd voor 1970. Panden gebouwd voor 1970 hebben meermaal een houten of ondiepe fundering. Deze kunnen kwetsbaar zijn, vooral waar de draagkracht van de bodem beperkt is. Dat is in dit gebied zo. Aandacht voor de aard en staat van de fundering is hier van belang, zeker in geval van concrete aanwijzingen.'
                resizeBtn.innerHTML = '<i class="fas fa-expand"></i>'
            }
            resizeBtn.classList.toggle('btn-position');
        }, */

        /* goRisk: function() {
            this.foundationCheck = false;
        },
        backRist: function() {
            this.riskCheck = true;
            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.remove('center');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        }, */

        goComplaint: function() {
            this.complaintCheck = true;
            this.foundationCheck = false;
            // this.riskCheck = false;
            // this.alertCheck = false;
            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.add('center');
            document.querySelector('#app').classList.add('darken');
            document.querySelector('#page-mask').classList.add('active');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },
        backComplaint: function() {
            this.complaintCheck = true;
        },

        goDamage: function() {
            let form = document.querySelector('#complaintCheck');
            let radios = form.querySelectorAll('input');
            this.errors = [];

            if (!this.validateRadio(radios)) {
                this.errors.push('Geen optie geselecteerd.');
                document.querySelector('form').style.height = 'auto';
            } else {
                this.damageCheck = true;
                this.complaintCheck = false;
            }
            
        },
        backDamage: function() {
            this.damageCheck = true;
            this.errors = [];
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

        goRecog: function() {
            let form = document.querySelector('#damageCheck');
            let radios = form.querySelectorAll('input');
            this.errors = [];

            if (!this.validateRadio(radios)) {
                this.errors.push('Geen optie geselecteerd.');
                document.querySelector('form').style.height = 'auto';
            } else {
                this.damageCheck = false;
                this.recogCheck = true;
            }
            
        },
        backRecog: function() {
            this.recogCheck = true;
        },

        goSurrounding: function() {
            let form = document.querySelector('#recogCheck');
            let radios = form.querySelectorAll('input');
            this.errors = [];

            if (!this.validateRadio(radios)) {
                this.errors.push('Geen optie geselecteerd.');
                document.querySelector('form').style.height = 'auto';
            } else {
                this.recogCheck = false;
                this.surroundingCheck = true;
            }
            
        },
        backSurrounding: function() {
            this.surroundingCheck = true;
        },

        adviseText: function(e) {
            let checkboxNothing = document.querySelector('#nothing')
            
            if (checkboxNothing.checked === true) {
                this.recogCheckNothing = true;
            } else {
                this.recogCheckNothing = false;
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

        goUpload: function() {
            this.uploadCheck = true;
            this.surroundingCheck = false;
            this.errors = [];
        },
        backUpload: function() {
            this.uploadCheck = true;
        },
        enableFileUpload: function(e) {
            let uploadContainer = document.querySelector('.upload-container');
            let uploadReport = document.querySelector('#uploadReport');
            let fileButton = document.querySelector('.btn-toggle');
            let dragText = document.querySelector('.filetext');
            if (e.target.id === "researchNo") {
                uploadContainer.style.border = "2px dashed #bfbdbd";
                uploadReport.disabled = true;
                fileButton.classList.add("button-disabled");
                dragText.style.color = '#bfbdbd';
            } else {
                uploadContainer.style.border = "2px dashed #39434E";
                uploadReport.disabled = false;
                fileButton.classList.remove("button-disabled");
                dragText.style.color = '#39434E';
            }
        },
        dropHandler: function(e) {
            if (e.dataTransfer.items) {
                for (let i = 0; i < e.dataTransfer.items.length; i++) {
                    if (e.dataTransfer.items[i].kind === 'file') {
                        let file = e.dataTransfer.items[i].getAsFile();
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
            // this.alertCheck = true;
            // this.riskCheck = false;
            this.recogCheck = false;
            this.complaintCheck = false;
            this.damageCheck = false;
            this.uploadCheck = false;
            this.advise = false;
        },

        validateRadio: function(radio) {
            for (let i = 0; i < radio.length; i++) {
                if (radio[i].checked) {
                    return true;
                }
            }
            return false;
        },

        documents: function() {
            location.href = "#documents";
        },
    }
}
</script>

<style lang="scss">
    @import '../assets/sass/extends.scss';
    @import '../assets/sass/home.scss';

    .darken {
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
    }
</style>