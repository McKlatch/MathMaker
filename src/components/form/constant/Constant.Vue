<template>
  <b-col>
    <form-multiples :constant="constant"/>
    <form-range :constant="constant"/>
  </b-col>
</template>

<script>
import formRange from './Range.vue'
import formMultiples from './Multiples.vue'

export default {
  props: ['constant'],
  components: {
    formRange,
    formMultiples
  }
}
</script>