<template>
	<b-form-checkbox-group id="operatorsInput" name="operators" v-model="includeOperators">
    <b-form-checkbox v-for="o in includeOperatorsOptions"
      :value="o"
      :key="o"
    >
      {{ o }}
    </b-form-checkbox>
  </b-form-checkbox-group>
</template>

<script>

export default {
  data () {
    return {
      includeOperatorsOptions: []
    }
  },
  computed: {
    includeOperators: {
      get () {
        return this.$store.state.formInput.includeOperators
      },
      set (value) {
        this.$store.dispatch('updateOperators', value)
      }
    }
  },
  created () {
    this.includeOperatorsOptions = this.$store.state.formOptions.includeOperators
  }
}
</script>