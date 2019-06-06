<template>
    <section id="home">
        <form action="" class="check" id="checkForm" method="POST">
            <fieldset v-if="check" id="check">
                <legend><span></span> Doe de check</legend>
                <label for="postcode">Postcode </label>
                <input type="text" id="postcode" v-model="zipcode" placeholder="1000XX">
                <label for="huisnummer">Huisnummer </label>
                <input type="text" v-model="housenumber" id="huisnummer" placeholder="1A">
                <p v-if="errors.length"><b>Een of meer fouten zijn voorgekomen:</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <button class="btn-success" @click.prevent="goFundering">Ga verder </button>
            </fieldset>
            <fieldset v-if="!check && foundationCheck" v-cloak id="foundationCheck">
                <h1>Op welke type fundering staat uw woning gebouwt?</h1>
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
                <button class="btn-success" @click.prevent="goZipcode">Ga verder </button>
                <a @click.prevent="backCheck">Stap terug</a>
            </fieldset>
            <fieldset v-if="!foundationCheck && zipcodeCheck" v-cloak id="zipcodeCheck">
                <div>
                    <img src="../../static/img/postcodemap.png" id="mapImage" alt="postcodemap">
                    <button class="btn-expand" @click.prevent="resizeMap"><i class="fas fa-expand"></i></button>
                </div>
                <label for="postcodegebied">Postcodegebied: {{zipcode}} - {{housenumber}}</label>
                <p class="img-description">Dit postcodegebied bevat 41 panden (BAG). Van deze panden is 100% gebouwd voor 1970. Panden gebouwd voor 1970 hebben meermaal een houten of ondiepe fundering. Deze kunnen kwetsbaar zijn, vooral waar de draagkracht van de bodem beperkt is. Dat is in dit gebied zo. Aandacht voor de aard en staat van de fundering is hier van belang, zeker in geval van concrete aanwijzingen.</p>
                <button class="btn-success" @click.prevent="goRisico">Ga verder </button>
                <a @click.prevent="backFundering">Stap terug</a>
            </fieldset>
            <fieldset v-if="!zipcodeCheck && riskCheck" v-cloak id="riskCheck">
                <h1>U loopt mogelijk een risico</h1>
                <img src="../../static/img/warning.png" alt="warning">
                <p>Wilt u een klacht indienen over uw woning?</p>
                <button class="btn-white" @click.prevent="goKlacht">Ja </button>
                <button class="btn-grey" @click.prevent="goAlert">Nee </button>
                <a @click.prevent="backZipcode">Stap terug</a>
            </fieldset>
            <fieldset v-if="!riskCheck && !alertCheck && complaintCheck" v-cloak id="complaintCheck">
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
                <p v-if="errors.length"><b>Een of meer fouten zijn voorgekomen:</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <button class="btn-success" @click.prevent="goSchade">Ga verder </button>
                <a @click.prevent="backRisico">Stap terug</a>
            </fieldset>
            <fieldset v-if="!riskCheck && !complaintCheck && !damageCheck && alertCheck" v-cloak id="alertCheck">
                <p><b>Blijf alert.</b> Neem situaties die kunnen wijzen op funderingsproblemen altijd serieus. Want alle soorten funderingen kunnen in de loop der jaren door verschillende factoren te maken krijgen met problemen. </p><p class="newline"> Neem een kijk in onze documenten om verdere funderingsproblemen te voorkomen.</p>
                <button class="btn-success" @click.prevent="documenten"> Bekijk documenten</button>
                <a @click.prevent="backRisico">Stap terug</a>
            </fieldset>
            <fieldset v-if="!complaintCheck && damageCheck" v-cloak id="damageCheck">
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
            <fieldset v-if="!damageCheck && recogCheck" v-cloak id="recogCheck">
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
            <fieldset v-if="!recogCheck && uploadCheck" v-cloak id="uploadCheck" @change="enableFileUpload">
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
                <h1>Advies</h1>
                <h2>Funderingsonderzoek</h2>
                <article class="advies-container">
                    <div v-for="adv in adviseText" :key="adv.id">
                        <h3>{{ adv.title }}</h3>
                        <p>{{ adv.text }}</p>
                    </div>
                </article>
                <a class="stappenplan" href="https://www.kcaf.nl/stappenplan-funderingsherstel/" target="_blank">Bekijk het hele stappenplan <i class="fas fa-external-link-alt"></i></a>
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

const whitelabel = require('../../whitelabel.config')[process.env.VUE_APP_BRAND];
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
            introText: whitelabel.introText,
            errors: [],
            zipcode: null,
            housenumber: null,
            check: true,
            foundationCheck: true,
            zipcodeCheck: true,
            riskCheck: true,
            complaintCheck: true,
            alertCheck: true,
            damageCheck: true,
            recogCheck: true,
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
            adviseText: [
                {
                    'title': '4.1 Soms is funderingsonderzoek overbodig.',
                    'text': 'Als scheefstand en/of forse scheurvorming aanwezig is zal funderingsonderzoek niet altijd nodig zijn of beperkt kunnen blijven tot een zogeheten quickscan, waarbij alleen bovengrondse zaken worden ingemeten. Dit beperkte onderzoek kan noodzakelijk zijn om mede eigenaren van de bouwkundige eenheid te overtuigen. Ga verder naar stap 6',
                },
                {
                    'title': '4.2 Funderingsonderzoek',
                    'text': 'Het loont de moeite om bij meerdere funderingsonderzoeksbedrijven een offerte op te vragen voor de hele bouwkundige eenheid. Het uitgangspunt hierbij is dat het onderzoek wordt uitgevoerd volgens de laatst vastgestelde F3O-richtlijn voor funderingsonderzoek. Samen met de andere eigenaren (en eventueel een deskundige) kan vervolgens een keuze worden gemaakt uit de ontvangen offertes. Het is verstandig om vooraf met de andere eigenaren een verdeelsleutel af te spreken over de te maken kosten. Dat kan bijvoorbeeld op basis van het woningoppervlak of volgens de splitsingsakte van de VVE. Enkele gemeenten geven subsidie of laten funderingsonderzoek voor hun rekening uitvoeren. Dit is op te vragen bij de eigen gemeente. Als de betreffende gemeente geen regeling voor funderingsonderzoek heeft, dan kan een van de eigenaren een rekening openen zodat iedereen daarop zijn/haar bijdrage kan storten voor het funderingsonderzoek. De mede-eigenaren geven schriftelijk toestemming voor het onderzoek en vervolgens kan daarna opdracht worden verstrekt voor het funderingsonderzoek.',
                },
                {
                    'title': '4.3 Uitvoering funderingsonderzoek',
                    'text': 'Zowel de lintvoeg in het metselwerk als enkele vloervelden zullen worden nagemeten met behulp van een waterpas. Dit om zettingen en verzakkingen sinds de oorspronkelijke bouw in beeld te krijgen. Op een aantal plaatsen wordt daarna de fundering ontgraven, ingemeten en in kaart gebracht. Bij houten funderingen worden volgens de richtlijn zo nodig houtmonsters genomen. Zie de vigerende F3O-richtlijn.',
                },
                {
                    'title': '4.4 Het rapport beschikbaar',
                    'text': 'Na het onderzoek stuurt het onderzoeksbureau een rapport per post of digitaal. Het is belangrijk om, ook bij een gunstige uitkomst, het rapport goed te bewaren. Indien gewenst kunnen de eigenaren het funderingsonderzoeks-bureau vragen om een toelichting te komen geven op haar bevindingen, waarbij zo mogelijk alle mede-eigenaren van de bouwkundige eenheid aanwezig zijn. Bij twijfel over de rapportage kan eventueel een externe onafhankelijke deskundige in de arm worden genomen. Als het rapport niet voldoet aan de vigerende F3O-richtlijn dan hoeven de eigenaren het niet te accepteren. Het onderzoeksbureau zal het funderingsonderzoek dan alsnog volgens de richtlijn dienen uit te voeren. De conclusie van het onderzoeksrapport kan zijn: De fundering is goed Verdere actie is niet nodig. Het is aan te raden om wel het rapport te bewaren. Overwogen kan worden om, indien niet in de nabijheid aanwezig, enkele peilbuizen bij de voorgevel aan te brengen en de grondwaterstand te meten en te registreren. In ieder geval in de zomerperiode. De fundering is goed mits de grondwaterstand minstens 20 cm boven het hoogste funderingshout blijft staan. Om de voortgang te monitoren kunnen peilbuizen worden aangebracht, indien deze niet in de nabijheid aanwezig zijn. Dit gebeurt zo dicht mogelijk bij de voor- en achtergevel om de andere woning. De peilbuizen worden iedere maand gemeten. Hierbij is het belangrijk dat de gegevens worden genoteerd. De fundering is nog goed maar het grondwater staat periodiek te laag.',
                },
            ]
        }
    },
    methods: {
        goCheck: function() {
            this.check = true;
            this.advise = false;
        },
        backCheck: function() {
            this.check = true;
            this.errors = [];
        },

        goFundering: function() {
            let zipField = document.querySelector('#postcode');
            let hnrField = document.querySelector('#huisnummer')
            this.errors = [];

            /* if (!this.zipcode) {
                this.errors.push('Postcode is verplicht.');
                zipField.style.borderBottom = '1px solid #ff2222';
                hnrField.style.borderBottom = '1px solid #004265';
                document.querySelector('.btn-success').style.marginTop = '0';
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
            } */

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
        backFundering: function() {
            this.foundationCheck = true;
        },

        goZipcode: function() {
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
        },

        goRisico: function() {
            this.zipcodeCheck = false;
        },
        backRisico: function() {
            this.riskCheck = true;
            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.remove('center');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },

        goKlacht: function() {
            this.complaintCheck = true;
            this.riskCheck = false;
            this.alertCheck = false;
            let checkForm = document.querySelector('#checkForm');
            checkForm.classList.add('center');
            checkForm.scrollIntoView({behavior: "smooth", block: "end"});
        },
        backKlacht: function() {
            this.complaintCheck = true;
        },

        goSchade: function() {
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
        backSchade: function() {
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

        goHerken: function() {
            this.damageCheck = false;
            this.recogCheck = true;
        },
        backHerken: function() {
            this.recogCheck = true;
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
            this.recogCheck = false;
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
            this.riskCheck = false;
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