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
                <div>
                    <input type="radio" name="funderingoptie" id="wood">
                    <label for="wood"> Houten palen</label>
                </div>
                <div>
                    <input type="radio" name="funderingoptie" id="shallow">
                    <label for="shallow"> Ondiepe fundering</label>
                </div>
                <div>
                    <input type="radio" name="funderingoptie" id="concrete">
                    <label for="concrete"> Betonnen palen</label>
                </div>
                <div>
                    <input type="radio" name="funderingoptie" id="unknown">
                    <label for="unknown"> Weet ik niet</label>
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
                <h1>Heeft u een vrijstaand pand of is uw woning onderdeel van een (bouw)blok?</h1>
                <div>
                    <input type="radio" name="vrijstaand_bouwblok" id="detached">
                    <label for="detached"> Vrijstaand pand</label>
                </div>
                <div>
                    <input type="radio" name="vrijstaand_bouwblok" id="buildingBlock">
                    <label for="buildingBlock"> Onderdeel van een (bouw)blok</label>
                </div>
                <h1>Bent u de eigenaar of de huurder van uw woning?</h1>
                <div>
                    <input type="radio" name="eigenaar_huurder" id="owner">
                    <label for="owner"> Eigenaar</label>
                </div>
                <div>
                    <input type="radio" name="eigenaar_huurder" id="tenant">
                    <label for="tenant"> Huurder</label>
                </div>
                <button class="btn-success" @click.prevent="goZipcode">Ga verder </button>
                <a @click.prevent="backCheck">Stap terug</a>
            </fieldset>
            <fieldset v-if="!risicoCheck && !klachtCheck && alertCheck" v-cloak id="alertCheck">
                <p><b>Blijf alert.</b> Neem situaties die kunnen wijzen op funderingsproblemen altijd serieus. Want alle soorten funderingen kunnen in de loop der jaren door verschillende factoren te maken krijgen met problemen. </p><p class="newline"> Neem een kijk in onze documenten om verdere funderingsproblemen te voorkomen.</p>
                <button class="btn-success" @click.prevent="documenten"> Bekijk documenten</button>
                <a @click.prevent="backRisico">Stap terug</a>
            </fieldset>
        </form>
        <article>
            <h1>Wie zijn wij?</h1>
            <p>
                Stichting Kennis Centrum Aanpak Funderingsproblematiek (KCAF) is een stichting met als doelstelling het verzamelen, ontwikkelen en ontsluiten van kennis rond de aanpak en preventie van funderingsproblemen. KCAF fungeert als nationaal funderingsloket voor alle vragen rond deze problematiek. Van funderingsonderzoek tot funderingsherstel, van aanpak tot financiering, van
                preventie tot innovatie. Deze doelstelling willen we samen met vakmensen en eigen medewerkers bereiken.
                KCAF is een stichting zonder winstoogmerk.
            </p>
        </article>
    </section>
</template>

<script>
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
        },

        goKlacht: function() {
            this.risicoCheck = false;
            this.alertCheck = false;
        },
        backKlacht: function() {
            this.klachtCheck = true;
        },

        goAlert: function() {
            this.risicoCheck = false;
            this.klachtCheck = false;
        },

        documenten: function() {
            location.href = "#documenten";
        },
    }
}
</script>

<style lang="scss">
    $lightblue: #82C2E8;
    $blue: #28ABE3;
    $darkblue: #004265;
    $lightblack: #3B4552;
    $black: #39434E;
    $grey: #DEDEDE;
    $main-font: 'Helvetica Neue';

    %btn {
        width: 100%; height: 2.8rem;
        border: none;
        font-size: 1.2rem;
        color: #fff;
        margin-top: 1.5rem;
        box-shadow: 2px 2px 8px #b1b1b1;
        cursor: pointer;
    }

    %back-button {
        color: rgb(170, 170, 170);
        text-decoration: none;
        font-weight: 300;
        text-shadow: none;
        font-size: 1rem;
        cursor: pointer;
        &:hover { text-decoration: underline; }
    }

    #home {
        form {
            position: absolute;
            top: 25rem; right: 13rem;
            min-width: 29rem; min-height: 22rem;
            background-color: #F2F2F2;
            padding: 1.6rem 1.5rem;
            box-shadow: 0px 0px 50px rgba(0,0,0, .35);
        }
            fieldset { 
                border: none; 
                max-width: 25rem;
                img[alt="postcodemap"] {
                    position: relative;
                    bottom: 2rem;
                    right: 2.4rem;
                    max-width: 15rem;
                }
            }
            #funderingCheck {
                h1 { 
                    color: $darkblue;
                    font-weight: 500;
                    margin: 0;
                    margin-bottom: 2rem;
                }
                div {
                    display: flex;
                    margin: .7rem 0rem;
                    input[type="radio"] {
                        width: auto;
                        margin: 0; padding: 0;
                        display: inherit;
                    }
                    label {
                        color: $black;
                        font-size: 1.3rem;
                        margin: 0; padding: 0;
                        padding-left: .4rem;
                        display: inherit;
                    }
                }
                button { margin-bottom: 1rem; margin-top: 3rem; }
            }
            #zipcodeCheck {
                label {
                    margin: -1rem 0 0 0;
                }
                p {
                    font-size: 0.95rem;
                    margin: 0.2rem 0 0 0;
                }
                button { margin-bottom: 1rem; margin-top: 1.2rem; }
            }
            #risicoCheck {
                background-color: $blue;
                color: #fff;
                margin: -1.6rem -1.5rem;
                min-width: 30rem;
                min-height: 25rem;
                text-align: center;
                p {
                    margin: 0.2rem 0 0 0;
                    padding-top: 1.8rem;
                    font-size: 1.2rem;
                }
                .btn-white {
                    @extend %btn;
                    margin: 1rem 0.6rem;
                    color: rgb(24, 24, 24);
                    width: 45%;
                    box-shadow: 2px 2px 19px rgba(77, 77, 77, 0.25);
                    font-size: 1.3rem;
                    font-weight: 500;
                    transition: all .1s linear;
                    &:hover { background-color: rgb(195, 195, 195); }
                }
                .btn-grey {
                    @extend .btn-white;
                    background-color: rgb(213, 213, 213);
                }
                a { @extend %back-button; color: #dadada; }
            }
            #alertCheck {
                p { font-size: 1.1rem; }
                button { margin-bottom: 1rem; margin-top: 0rem; }
                .newline { margin-bottom: 3rem; margin-top: 2rem;}
            }
            legend {
                position: relative;
                font-size: 1.8rem;
                color: $darkblue;
                font-weight: 400;
                padding-left: 1.3rem;
                margin-bottom: 1.5rem;
            
                span {
                    position: absolute; 
                    left: 0rem; top: 7px;
                    background-color: #129DDD;
                    height: 1.4rem;  width: 0.4rem; 
                }
            }
            label {
                color: $darkblue;
                font-size: 1.2rem; font-weight: 400;
                margin-bottom: 1.1rem;
                display: block;
            }
            input {
                display: block;
                background: none;
                border: none; border-bottom: 1px solid $darkblue;
                width: 100%;
                font-size: 1rem;
                margin-bottom: 2rem; padding-bottom: 0.4rem;
                &:focus {
                    border-bottom: 1px solid $blue;
                }
            }
        .btn-success {
            @extend %btn;
            background-color: $blue;
            &:hover {
                transition: all .08s linear;
                background-color: $darkblue;
            }
        }
        a { @extend %back-button; }
        article {
            padding: 1rem 48rem 1rem 5rem;
            max-width: 100%;
            p { font-size: 1.2rem; }
        }
    }

</style>
