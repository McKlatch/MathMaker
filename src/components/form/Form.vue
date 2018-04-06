<template>
  <b-container fluid>
    <b-row align-h="center" no-gutters>
      <b-col lg="8" md="10" sm="12">
        <b-form @submit="onSubmit" @reset="onReset">
          <form-quantity/>
          <form-operators/>
          <form-sample v-if="isOp"/>
          <b-form-row>
            <form-constant v-for="constant in constants" :constant="constant-1" :key="constant-1"/>
          </b-form-row>
          <form-params/>
          <br>
          <b-button type="submit" variant="primary" :disabled="!isOp">Submit</b-button>
          <b-button type="reset" variant="secondary" size="sm">Restart</b-button>
        </b-form>
      </b-col>
    </b-row>
</b-container>
</template>

<script>
import formQuantity from './Quantity.vue'
import formOperators from './Operators.vue'
import formSample from './Sample.vue'
import formConstant from './constant/Constant.vue'
import formParams from './Params.vue'

export default {
  computed: {
    form () {
      return this.$store.state.formInput
    },
    isOp () {
      return this.form.includeOperators.length > 0
    },
    constants () {
      return this.$store.getters.constantsAvailable
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))
      this.$router.push('generated')
    },
    onReset (evt) {
      evt.preventDefault()
      this.$store.dispatch('resetAllInputs')
    }
  },
  created () {
    this.$store.dispatch('resetAllInputs')
  },
  components: {
    formQuantity,
    formOperators,
    formConstant,
    formParams,
    formSample
  }
}
</script>

<style>
</style>
