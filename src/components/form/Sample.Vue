<template>
  <b-form-row class="text-center">
    <b-col>
      <h1>{{ sampleEquation.question }} = {{ sampleEquation.answer }}</h1>
    </b-col>
  </b-form-row>
</template>

<script>

export default {
  computed: {
    sampleEquation () {
      return this.$store.getters.equationArray[0]
    }
  }
}
</script>