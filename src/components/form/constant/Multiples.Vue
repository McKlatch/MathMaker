<template>
	<b-form-checkbox-group
    name="multiples"
    v-model="multiples">
    <b-form-checkbox
      v-for="o in constantMultiplesOptions"
      :value="o"
      :key="o"
    >
      {{ o }}
    </b-form-checkbox>
  </b-form-checkbox-group>
</template>

<script>
export default {
  props: ['constant'],
  computed: {
    constantMultiplesOptions () {
      return this.$store.getters.constantMultiplesOptions(this.constant)
    },
    multiples: {
      get () {
        return this.$store.state.formInput.constants[this.constant].multiples
      },
      set (value) {
        this.$store.dispatch('updateMultiples', { constant: this.constant, value })
      }
    }
  }
}
</script>