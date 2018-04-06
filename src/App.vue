<template>
  <div id="app">
  	<app-header/>
	<router-view/>
    <app-footer/>
  </div>
</template>

<script>
import appHeader from './components/Header.vue'
import appFooter from './components/Footer.vue'

export default {
  name: 'app',
  components: { appHeader, appFooter }
}
</script>

<style>
</style>
