<template>
    <section id="home">
        <div id="page-mask"></div>
        <form class="check" id="checkForm">

            <fieldset v-if="check" id="check">
                <legend><span></span> Melding maken voor adres: </legend>
                <div class="form-group">
                    <div class="form-input">
                        <label for="postcode">Postcode </label>
                        <input type="text" id="postcode" v-model="zipcode" @blur="suggestAdresses" placeholder="1000XX">
                    </div>
                    <div class="form-input">
                        <label for="huisnummer">Huisnummer </label>
                        <input type="text" v-model="housenumber" id="huisnummer" @blur="suggestAdresses" placeholder="1A">
                    </div> 
                </div>
                <div class="address-box">
                    <h3>Adres</h3>
                    <p v-if="form.address">{{ form.address.streetName }}</p>
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
                <div v-for="found in foundationType" :key="found.id">
                    <label :for="found.id" class="radiolabel"> {{ found.labelText }}
                        <input type="radio" v-model="form.foundationType" :value="found.id" :id="found.id">
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
                <h2>Melding maken voor {{ zipcode }} - {{ housenumber }}</h2>
                <h3>Heeft u een vrijstaand pand of is uw woning onderdeel van een (bouw)blok?</h3>
                <div>
                    <label for="chainedBuilding0" class="radiolabel"> Vrijstaand pand
                        <input type="radio" v-model="form.chainedBuilding" value="0" id="chainedBuilding0">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <div>
                    <label for="chainedBuilding1" class="radiolabel"> Onderdeel van een (bouw)blok
                        <input type="radio" v-model="form.chainedBuilding" value="1" id="chainedBuilding1">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <h3 class="mt-2">Bent u de eigenaar of de huurder van uw woning?</h3>
                <div>
                    <label for="owner1" class="radiolabel"> Eigenaar
                        <input type="radio" v-model="form.owner" name="owner" value="1" id="owner1">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <div>
                    <label for="owner0" class="radiolabel"> Huurder
                        <input type="radio" v-model="form.owner" name="owner" value="0" id="owner0">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <h3 class="mt-2">Is bij een van uw directe buren funderingsherstel uitgevoerd?</h3>
                <div>
                    <label for="foundationRecovery1" class="radiolabel"> Ja
                        <input type="radio" v-model="form.foundationRecovery" value="1" id="foundationRecovery1">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <div>
                    <label for="foundationRecovery0" class="radiolabel"> Nee
                        <input type="radio" v-model="form.foundationRecovery" value="0" id="foundationRecovery0">
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
                <div v-for="damage in foundationDamageCause" :key="damage.id">
                    <div>
                        <label :for="damage.id" class="radiolabel"> {{ damage.labelText }}
                            <input type="radio" v-model="form.foundationDamageCause" :value="damage.id" :id="damage.id">
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
            
            <fieldset v-if="!damageCheck && recogCheck" v-cloak id="recogCheck">
                <h2>Herken je éen van de volgende punten in uw woning?</h2>
                <p>Meerdere opties mogelijk</p>
                <div v-for="last in foundationDamageCharacteristics" :key="last.id">
                    <div>
                        <label :for="last.id" class="radiolabel"> {{ last.labelText }}
                            <input type="checkbox" v-model="form.foundationDamageCharacteristics" :value="last.id" :id="last.id">
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
                <div v-for="surround in environmentDamageCharacteristics" :key="surround.id">
                    <div>
                        <label :for="surround.id" class="radiolabel"> {{ surround.labelText }}
                            <input type="checkbox" v-model="form.environmentDamageCharacteristics" :value="surround.id" :id="surround.id">
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
                    <label for="onderzoeksrapport1" class="radiolabel"> Ja
                        <input type="radio" name="onderzoeksrapport" id="onderzoeksrapport1" checked>
                        <span class="radiomark"></span>
                    </label>
                </div>
                <div class="upload-container" @drop.prevent="dropHandler" @dragover.prevent="dragOverHandler">
                    <input type="file" name="uploadReport" id="uploadReport">
                    <p class="filetext">Sleep het bestand hier</p>
                    <img src="../../static/img/upload-button.png" alt="upload-button">
                    <label class="btn-secondary btn-toggle" for="uploadReport">Of selecteer een bestand</label>
                </div>
                <div class="mt-5">
                    <label for="onderzoeksrapport0" class="radiolabel"> Nee
                        <input type="radio" name="onderzoeksrapport" id="onderzoeksrapport0">
                        <span class="radiomark"></span>
                    </label>
                </div>
                <button class="btn-success" @click.prevent="goAdvise">Ga verder </button>
                <a @click.prevent="backSurrounding">Stap terug</a>
            </fieldset>

            <fieldset v-if="!uploadCheck && advise" v-cloak id="advise">
                <h2>Advies</h2>
                <h3>Funderingsonderzoek</h3>
                <p v-if="!recogCheckNothing">Wij adviseren u in het (laten) uitvoeren van aanvullend onderzoek. In ons stappenplan leggen wij duidelijk uit welke stappen u kunt nemen en voor welke stappen professionele hulp noodzakelijk is.</p>
                <p v-else>U heeft vermoedelijk geen funderingsprobleem. Indien u toch twijfelt raden wij u aan ons stappenplan voor het achterhalen van Funderingsproblematiek te bekijken.</p>
                <a class="stappenplan" href="https://www.kcaf.nl/stappenplan-funderingsherstel/" target="_blank">Bekijk het hele stappenplan <i class="fas fa-external-link-alt"></i></a>
                <section class="user_data">
                    <h2>Laat uw gegevens bij ons achter</h2>
                    <p>Dit is niet verplicht</p>
                    <div class="form-group">
                        <label for="name">Naam</label>
                        <input type="text" v-model="form.name" id="name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" v-model="form.email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="phonenumber">Telefoonnummer</label>
                        <input type="text" v-model="form.phonenumber" id="phonenumber">
                    </div>
                </section>
                <button class="btn-success" @click.prevent="goCheck">Verzenden</button>
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

$(document).ready(function() { 
  $(window).scroll(function() { 
    let scroll = $(window).scrollTop() + 1,
            SectionOneOffset = $('#pageTop').offset().top,
            SectionTwoOffset = $('#documents').offset().top,
            SectionThreeOffset = $('#newsletter').offset().top;

    if (scroll >= SectionOneOffset) {
      $(".menu-item-1").addClass("active");
    } else {
      $(".menu-item-1").removeClass("active");
    }
    
    if (scroll >= SectionTwoOffset) {
      $(".menu-item-2").addClass("active");
      $(".menu-item-1").removeClass("active");
    } else {
      $(".menu-item-2").removeClass("active");
    }
    
    if (scroll >= SectionThreeOffset) {
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
            foundationType: [
                {
                    'id': 'wood',
                    'labelText': 'Houten palen'
                },
                {
                    'id': 'noPile',
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
            foundationDamageCause: [
                {
                    'id': 'foundationFlaw',
                    'labelText': 'Verkeerd gefundeerd bij bouw van de woning'
                },
                {
                    'id': 'fungusInfection',
                    'labelText': 'Aantasting van houten palen door schimmels of bacteriën'
                },
                {
                    'id': 'constructionHeave',
                    'labelText': 'Woning wordt van de funderingspalen omhoog gedrukt'
                },
                {
                    'id': 'overchargeNegativeCling',
                    'labelText': 'Funderingspalen worden naar beneden getrokken'
                },
                {
                    'id': 'subsidence',
                    'labelText': 'Bodemdaling'
                },
                {
                    'id': 'overcharge',
                    'labelText': 'Fundering niet meer berekend op huidige gewicht'
                },
                {
                    'id': 'vegetation',
                    'labelText': 'Beschadiging fundering door (planten)wortels'
                },
                {
                    'id': 'gas',
                    'labelText': 'Gaswinning'
                },
                {
                    'id': 'vibrations',
                    'labelText': 'Verkeer nabij het pand'
                },
                {
                    'id': 'partialFoundationRecovery',
                    'labelText': 'Funderingsherstel bij de buren'
                },
                {
                    'id': 'unknown',
                    'labelText': 'Weet ik niet'
                },
            ],
            foundationDamageCharacteristics: [
                {
                    'id': 'jammingDoorWindow',
                    'labelText': 'Ik heb last van klemmende deuren en/of ramen'
                },
                {
                    'id': 'crack',
                    'labelText': 'Er zit een scheur in mijn muur/gevel'
                },
                {
                    'id': 'skewed',
                    'labelText': 'Mijn woning staat wat scheef'
                },
                {
                    'id': 'crawlspaceFlooding',
                    'labelText': 'Er is sprake van hoog water in de kruipruimte'
                },
                {
                    'id': 'thresholdAboveSubsurface',
                    'labelText': 'De drempel van de woning ligt hoger dan het trottoir/weg'
                },
                {
                    'id': 'thresholdBelowSubsurface',
                    'labelText': 'De drempel van de woning ligt lager dan het trottoir/weg'
                },
                {
                    'id': 'crookedFloorWall',
                    'labelText': 'Er is sprake van scheve vloeren/muren in mijn woning'
                }
            ],
            environmentDamageCharacteristics: [
                {
                    'id': 'subsidence',
                    'labelText': 'Is er sprake van bodemdaling tuin/erf?'
                },
                {
                    'id': 'saggingSewerConnection',
                    'labelText': 'Heeft u last van verzakkende rioolaansluitingen?'
                },
                {
                    'id': 'saggingCablesPipes',
                    'labelText': 'Heeft u last van verzakkende kabels/leidingen'
                },
                {
                    'id': 'flooding',
                    'labelText': 'Heeft u wateroverlast?'
                },
                {
                    'id': 'lowGroundWater',
                    'labelText': 'Heeft u wateronderlast / droge bodem?'
                },
                {
                    'id': 'sewageLeakage',
                    'labelText': 'Is er sprake van lekkende riolering in de straat?'
                },
                {
                    'id': 'foundationDamageNearby',
                    'labelText': 'Zijn er woningen in uw bouwblok / buurt met signalen van funderingsproblemen?'
                },
                {
                    'id': 'elavation',
                    'labelText': 'Is de straat waarin de woning ligt onlangs opgehoogd?'
                },
                {
                    'id': 'increasingTraffic',
                    'labelText': 'Is er sprake van toenemend verkeer in uw straat?'
                },
                {
                    'id': 'constructionNearby',
                    'labelText': 'Vinden er in de directe omgeving bouwactiviteiten plaats?'
                },
                {
                    'id': 'vegetationNearby',
                    'labelText': 'Staan er grote bomen nabij de woning?'
                }
            ],
            form: {
              address: null,
              foundationType: null,
              chainedBuilding: null,
              documentName: null,
              owner: null,
              foundationRecovery: null,
              foundationDamageCause: null,
              foundationDamageCharacteristics: [],
              environmentDamageCharacteristics: [],
              name: null,
              email: null,
              phonenumber: null,
            }
        }
    },
    methods: {
        async suggestAdresses(query) {
          if (this.zipcode && this.housenumber) {
            // TODO: This should be handled via a store
            let response = await fetch(
                `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q=${this.zipcode} ${this.housenumber}&fq=type:adres&rows=1`
            );
            if (response.status === 200) {
              let data = await response.json()
              if (data.response.numFound > 0) {
                // this.form.selectedAddress = data.response.docs[0]
                let id = data.response.docs[0].id;

                let response2 = await fetch(
                    `https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=${id}`
                );
                if (response2.status === 200) {
                    let data2 = await response2.json()
                    let doc = data2.response.docs[0];
                    this.form.address = {
                        streetName: doc.weergavenaam, // NOTE: For now, just so we get back the entire name
                        building_number: doc.huisnummer,
                        bag: doc.nummeraanduiding_id,
                        additional: doc
                    };
                }
              }
            }
          }
        },

        goCheck() {
            // this.check = true;
            // this.advise = false;
            
            this.form.chainedBuilding = Number(this.form.chainedBuilding)
            this.form.owner = Number(this.form.owner)
            this.form.foundationRecovery = Number(this.form.foundationRecovery)

            fetch('https://staging.fundermaps.com/api/incident', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.form)
            });

            // let checkForm = document.querySelector('#checkForm');
            // checkForm.classList.remove('center');
            // document.querySelector('#app').classList.remove('darken');
            // document.querySelector('#page-mask').classList.remove('active');
            // checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },
        backCheck() {
            this.check = true;
            this.errors = [];
        },

        goFoundation() {
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
        validZipcode(zipcode) {
            let regex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
            return regex.test(zipcode);
        },
        validHousenumber(housenumber) {
            let regex = /^([0-9]){1,}([A-Za-z]){0,3}$/;
            return regex.test(housenumber);
        },
        backFoundation() {
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

        goComplaint() {
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
        backComplaint() {
            this.complaintCheck = true;
        },

        goDamage() {
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
        backDamage() {
            this.damageCheck = true;
            this.errors = [];
        },
        enableText(e) {
            let inputDamage = document.querySelector('#inputDamage');
            if (e.target.id === "other") {
                inputDamage.disabled = false;
                inputDamage.focus({preventScroll:false});
            } else {
                inputDamage.disabled = true;
            }
        },

        goRecog() {
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
        backRecog() {
            this.recogCheck = true;
        },

        goSurrounding() {
            this.recogCheck = false;
            this.surroundingCheck = true;
            
        },
        backSurrounding() {
            this.surroundingCheck = true;
        },

        adviseText(e) {
            let checkboxNothing = document.querySelector('#nothing')
            
            if (checkboxNothing.checked === true) {
                this.recogCheckNothing = true;
            } else {
                this.recogCheckNothing = false;
            }
        },

        enableTextCheckbox(e) {
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

        goUpload() {
            this.uploadCheck = true;
            this.surroundingCheck = false;
            this.errors = [];
        },
        backUpload() {
            this.uploadCheck = true;
        },
        enableFileUpload(e) {
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
        dropHandler(e) {
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
        dragOverHandler(e) {
            if (e) {
                document.querySelector('.filetext').innerHTML = "Afbeelding uploaden...";
                document.querySelector('.upload-container').classList.add('file-adding');
            }
        },

        goAdvise() {
            this.uploadCheck = false;
            this.advise = true;
        },

        goAlert() {
            // this.alertCheck = true;
            // this.riskCheck = false;
            this.recogCheck = false;
            this.complaintCheck = false;
            this.damageCheck = false;
            this.uploadCheck = false;
            this.advise = false;
        },

        validateRadio(radio) {
            for (let i = 0; i < radio.length; i++) {
                if (radio[i].checked) {
                    return true;
                }
            }
            return false;
        },

        documents() {
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