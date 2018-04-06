<template>
  <div>
    <b-form-checkbox id="includeNegativeAns"
                   v-model="includeNegativeAns"
                   value="true"
                   unchecked-value="false"
                   v-if="isNeg"
    >
      Include Negative Answers
    </b-form-checkbox>
    <b-form-checkbox id="wholeAnsOnly"
                   v-model="wholeAnsOnly"
                   value="true"
                   unchecked-value="false"
                   v-if="isDiv"
    >
      Whole Answers Only
    </b-form-checkbox>
    <b-form-checkbox id="modularRemainders"
                   v-model="modularRemainders"
                   value="true"
                   unchecked-value="false"
                   v-if="isDiv"
    >
      Modular Remainders
    </b-form-checkbox>
  </div>
</template>

<script>

export default {
  computed: {
    isNeg () {
      return this.$store.state.formInput.includeOperators.includes('➖')
    },
    isDiv () {
      return this.$store.state.formInput.includeOperators.includes('➗')
    },
    includeNegativeAns: {
      get () {
        return this.$store.state.formInput.subtractionVars.includeNegativeAns
      },
      set (value) {
        this.$store.dispatch('updateNegativeAns', value === 'true')
      }
    },
    wholeAnsOnly: {
      get () {
        return this.$store.state.formInput.divisionVars.wholeAnsOnly
      },
      set (value) {
        this.$store.dispatch('updatewholeAnsOnly', value === 'true')
      }
    },
    modularRemainders: {
      get () {
        return this.$store.state.formInput.divisionVars.modularRemainders
      },
      set (value) {
        this.$store.dispatch('updatemodularRemainders', value === 'true')
      }
    }
  }
}
</script>