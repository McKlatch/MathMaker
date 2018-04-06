<template>
	<b-form-group
    label="Values Between:"
  >
    <vue-slider
      name="between"
      v-model="range"
      v-bind="rangeSlider"
    />
  </b-form-group>
</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
  props: ['constant'],
  data () {
    return {
      rangeSlider: {
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
    range: {
      get () {
        return this.$store.state.formInput.constants[this.constant].range
      },
      set (value) {
        this.$store.dispatch('updateRange', { constant: this.constant, value })
      }
    }
  },
  created () {
    this.rangeSlider.min = this.$store.state.formOptions.constantRange.min
    this.rangeSlider.max = this.$store.state.formOptions.constantRange.max
  },
  components: {
    vueSlider
  }
}
</script>