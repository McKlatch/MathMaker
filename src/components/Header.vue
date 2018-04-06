<template>
  <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/">MathMaker</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item to="/form" active-class="hidden">Get Started</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-b-modal.about>About</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
  <b-modal id="about" title="MathMaker" lazy hide-footer>
    <p>A CS50 Final Project by <a href="http://twitter.com/mcklatch">David McClatchey</a>
      <br><br>
      Originally made using Python, Django, Jinja2, JavaScript, Jquery, Bootstrap, AJAX.
      <br><br>
      This version made entirely in VueJS2 with vuex, vue-router, and bootstrap-vue</p>
  </b-modal>
</b-navbar>
</template>

<script>
export default {

}
</script>

<style>
  .hidden {
    visibility: hidden;
  }
</style>
