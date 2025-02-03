<template>
    <v-container class="pb-0">
        <v-col cols="12" class="pb-0">
            <h2 class="font-weight-bold text-primary txt-h2 text-center sub-title mt-3">MAXIMIZE YOUR BUDGET:</h2>
            <h1 class="font-weight-medium text-secondary txt-h1 text-center">PAYROLL <strong>CALCULATOR</strong></h1>
            <h6 class="font-weight-regular text-primary txt-h6 text-center mt-6">Compare your payroll costs and see how much you can <strong>save with Tree Care Office.</strong></h6>
            <p class="font-weight-regular font-italic text-primary text-center mt-16 info">Choose a position, a market near you, and time period for payroll.</p>
        </v-col>
    </v-container>
    <v-form v-model="valid">
        <v-container class="width-form">
            <v-row justify="space-between" align="center">
                <v-col cols="12" md="3">
                    <v-select v-model="selectedPosition" :items="positions" item-text="Position" item-value="value"
                        label="Position" clearable variant="solo-filled"  class="mt-3 input-select"></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="selectedState" :items="states" label="State" clearable variant="solo-filled" class="mt-3"></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select v-model="selectedTimeSlot" :items="timeSlots" label="Time Period" clearable variant="solo-filled"
                        class="mt-3"></v-select>
                </v-col>
                <v-col cols="12" md="3" class="d-flex justify-center align-center">
                    <v-btn color="secondary" variant="outlined" size="large" class=" submit-button" @click="searchData" :disabled="isButtonDisabled">Check</v-btn>
                </v-col>

                <div id="meeting-container">
                    <v-img
                        src="@/assets/imgs/Icon-Meeting.webp"
                        :width="mdAndUp ? 140 : 100"
                        class="meeting"
                        alt="Meeting Icon"
                        @click="openCalendlyModal"
                    />
                </div>

            </v-row>
        </v-container>
    </v-form>
    <v-container v-if="state" class="card">
        <v-row class="ma-0 pb-0 justify-center">
            <v-col cols="3" class="pb-0 pt-0 mt-n12 justify-center">
                <v-img class="Img-Bigfoot" src="@/assets/imgs/bigfoot-image.webp" alt="Nerd Bigfoot wearing glass and hold on calculator"></v-img>
            </v-col>
        </v-row>
        <v-hover v-slot="{ isHovering, props }" class="mt-0 pt-0 ">
            <div v-bind="props" :class="`elevation-${isHovering ? 24 : 6}`" class="mt-0 px-5 mxw-1000 mx-auto transition-swing rounded-xl" id="card">
              <v-row class="mt-0 mb-5 justify-center">
                <v-col id="results" cols="8" class="rounded-b-xl Card-Title" >
                  <h2 class="font-weight-normal text-primary txt-h4 text-center">
                    {{ positionName }}
                  </h2>
                  <h3 class="font-weight-medium text-primary txt-h6 text-center">
                    {{ timeSlot }} Salary
                  </h3>
                </v-col>
              </v-row>
              <div class="Card-Result">
                <v-row class="justify-end data-row" no-gutters >
                  <v-col sm="4"  align-self="start">
                    <v-sheet class="pa-2 ma-2 text-center data">
                      <p><strong>TREE CARE OFFICE</strong></p>
                      <p>PRICING</p>
                      <p class=""><small class="mr-2">USD</small><span class="font-weight-light text-center txt-h4 number">{{ vinaliSavingI }}</span></p>
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-row class="justify-center data-row" no-gutters >
                  <v-col sm="4" align-self="start">
                    <v-sheet class="pa-2 ma-2 text-center data text-white savings">
                      <p>SAVINGS</p>
                      <p><strong>WITH TCO</strong></p>
                      <p class="txt-h3 font-weight-bold text-center number">{{ savePercentI }}%</p>
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-row class="justify-start data-row" no-gutters>
                  <v-col sm="4" align-self="start">
                    <v-sheet class="pa-2 ma-2 text-center data">
                      <p><strong class="text-uppercase">{{ state }}</strong></p>
                      <p>INDUSTRY PRICING*</p>
                      <p class=""><small class="mr-2">USD</small><span class="font-weight-light text-center txt-h4 number">{{ independentValue }}</span></p>
                    </v-sheet>
                  </v-col>
                </v-row>
              </div>
              <v-row justify="center" class="pt-5 pb-n8">
                <v-col cols="12" md="7" class="pb-0 mb-n5">
                  <v-btn block rounded="xl" size="large" color="primary" @click="openCalendlyModal" target="_blank" class="font-weight-bold txt-s-sm">
                    BOOK A DISCOVERY CALL NOW
                  </v-btn>
                  <v-dialog v-model="dialog" activator="parent" width="auto">
                      <v-card>
                          <v-card-item>
                              <div id="calendlyEmbed"></div>
                          </v-card-item>
                      </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </div>
        </v-hover>
        <v-row justify="center">
          <v-col sm="8" xs="10" class="mt-10 text-center" >
              <small class="text-caption text-grey-darken-1">*Prices found on CareerBuilder are based on roles in 2024, and are accounting for full-time wages, taxes, insurance, full benefits, and equipment. These are general estimates and quotes based on industry pricing, and are subject to change based on a case-by-case basis. Actual costs may vary based on specific circumstances; use as a general estimate. Consult with us for personalized advice.</small>
          </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref, watch, computed } from 'vue';
import { useCalculatorStore } from '../store/calculator';
import { useDisplay } from 'vuetify'

const { mdAndUp, lgAndUp, smAndUp, mdAndDown } = useDisplay();

const payrollData = useCalculatorStore();
const { payData, positions, states, timeSlots } = storeToRefs(payrollData);

const valid = ref(false);
const dialog = ref(false);

const openCalendlyModal = () => {
    dialog.value = true;
    Calendly.initPopupWidget({url: 'https://calendly.com/israel-treecareoffice/tree-care-office-workforce-analysis'})
}

const selectedPosition = ref('')
const selectedState = ref('')
const selectedTimeSlot = ref('')
const position = ref('')
const positionName = ref('')
const state = ref('')
const independentValue = ref('')
const timeSlot = ref('')
const vinali = ref('')
const vinaliSavingI = ref('')
const savePercentI = ref('')
const isButtonDisabled = ref(true)

const period = (item) => {
    switch (timeSlot.value) {
        case 'Yearly':
            return item * 2080;
        case 'Monthly':
            return item * 172.98
        default:
            return item
    }
}

const thousand = (i) => {
  let round = i.toFixed(0);
  return round.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const savePercent = (x,y) => {
  return Number(((x/y)*100).toFixed(0))
}

const searchData = () => {
  var vinaliData = 0
  var independentVal = 0
  var positionData = payData.value.find((item) => item.value === selectedPosition.value)

  payData.value.map((pos) => {
    if (pos.value === selectedPosition.value) {
      vinaliData = pos.Vinali
      pos.states.map((i) => {
        if (i.state === selectedState.value) {
            independentVal = i.independent
        }
      })
    }
  })

  position.value = selectedPosition.value
  state.value = selectedState.value
  timeSlot.value = selectedTimeSlot.value
  const job = payData.value.find((item) => item.value === selectedPosition.value ? item : '')
  positionName.value = job ? job.name : ''
  

  if (positionData) {
    if (timeSlot.value === 'Hourly') {
      independentValue.value = period(independentVal).toFixed(2) || ''
      vinali.value = period(vinaliData).toFixed(2) || ''
      
    } else {
        var indepenThus = Math.trunc(period(independentVal))
        var vinaliThus = Math.trunc(period(vinaliData))
        independentValue.value = thousand(indepenThus) || ''
        vinali.value = thousand(vinaliThus) || ''
    }
  } else {
    // Manejar el caso en que no se encuentre la posición en el JSON
    console.error('No se encontraron datos en la búsqueda.')
  }

  if (timeSlot.value === 'Hourly') {
    vinaliSavingI.value = Number((vinali.value)).toFixed(2) || ''
    savePercentI.value = savePercent((independentValue.value - vinali.value), independentValue.value)
  } else {
    var savingI = Math.trunc(vinaliThus)
      vinaliSavingI.value = thousand(savingI) || '';
      savePercentI.value = savePercent((indepenThus - vinaliThus), indepenThus)
  }

  setTimeout(() => {
    const result = document.getElementById('results')
    if (result) {
      result.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100);

}

watch([selectedPosition, selectedState, selectedTimeSlot], () => {
    if (selectedPosition.value && selectedState.value && selectedTimeSlot.value) {
      isButtonDisabled.value = false;
    } else {
      isButtonDisabled.value = true;
    }
});
</script>

<style lang="scss" scoped>
  .sub-title {
    color: #2C5746;
    letter-spacing: 0.2em;
    font-size: 1em;
    font-weight: bold;
   }
   @media (max-width: 512px){
    .txt-h1 {
      line-height: 0.9em;
      font-size: 2.8em;
    }
   }
  .width-form {
      @media (min-width: 600px) and (max-width: 959px) {
          width: 60%;
      }
  }
  .submit-button {
    border: .125rem solid currentColor;
    border-radius: 6.25rem;
    font-weight: bold;
  }
  .submit-button:hover {
    background-color: rgb(var(--v-theme-secondary)) ;
    color: white !important;
  }
  .Img-Bigfoot{
    width: 100%;
    min-width: 9.375rem;
    max-width: 12.5rem;
    height: 100%;
    position: relative;
    top: 1em;
    @media (min-width: 800px) and (max-width: 959px) {
      top: 0.9em;
    }
    @media (min-width: 300px) and (max-width: 799px) {
      top: 0.8em;
    }
  }
  .Card-Title {
    background-color: #FFFFFF
    ;
  }
  .saving {
      h6 { line-height: 1;}
      img { width: 30%; }
  }
  #meeting-container {
      width: 100%;
      .meeting {
          position: fixed;
          right: .9375rem;
          top: calc(50% - 100px);
          margin-right: -24px;
          z-index: 9;
          cursor: pointer;
      }
  }
  #card {
    background-image: url(../assets/imgs/bg-card.webp);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
  }
  .Card-Result {
    background-image: url(../assets/imgs/bg-card-results.webp);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    .data {
      background-color: transparent;
      @media (min-width: 300px) and (max-width: 500px) {
        font-size: 0.9em;
      }
    }
    .savings {
      font-size: larger;
      @media (min-width: 300px) and (max-width: 500px) {
        font-size: 1em;
      }
    }
    .number {
      @media (min-width: 300px) and (max-width: 500px) {
        font-size: 1.8em;
      }
    }

    @media (min-width: 300px) and (max-width: 600px) {
        .data-row {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
  }
  .border-top { border-top: 1px solid rgba(0,0,0,0.2); }
  .border-bottom { border-bottom: 1px solid rgba(0,0,0,0.2); }
  .border-right { border-right: 1px solid rgba(0,0,0,0.2); }
  .desktop {
      display: none;
      @media (min-width: 959px) {
          display: block;
      }
  }
  .mobile {
      display: block;
      @media (min-width: 959px) {
          display: none;
      }
  }
  .txt-s-sm {
    @media (max-width: 500px) {
      font-size: 0.8em;
    }
  }
</style>
