<template>
	<b-form-group
    label="Question Quantity:"
  >
    <vue-slider
      name="quantity"
      v-model="questionQuantity"
      v-bind="questionQuantitySlider"
    />
  </b-form-group>
</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  data () {
    return {
      questionQuantitySlider: {
        eventType: 'auto',
        width: 'auto',
        height: 6,
        dotSize: 16,
        min: 0,
        max: 0,
        interval: 1,
        show: true,
        speed: 0.5,
        tooltip: 'always',
        tooltipDir: 'top',
        clickable: true
      }
    }
  },
  computed: {
    questionQuantity: {
      get () {
        return this.$store.state.formInput.questionQuantity
      },
      set (value) {
        this.$store.dispatch('updateQuantity', value)
      }
    }
  },
  created () {
    this.questionQuantitySlider.min = this.$store.state.formOptions.questionQuantity.min
    this.questionQuantitySlider.max = this.$store.state.formOptions.questionQuantity.max
  },
  components: {
    vueSlider
  }
}
</script>