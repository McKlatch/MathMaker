<template>
  <b-jumbotron>
    <template slot="header">
      MathMaker
    </template>
    <template slot="lead">
      Randomly generated maths exercises for teachers to share with children.
      <br>
      Aimed at UK Key Stage 1 and 2.
    </template>
    <hr>
    <p>
      Entire project made personally with all features designed and implemented by <a href="http://twitter.com/mcklatch" rel="noopener noreferrer" target="_blank">David McClatchey</a>.
      <br>
      Made to the specifications of the final project assignment at <a href="https://cs50.harvard.edu/" rel="noopener noreferrer" target="_blank">Harvard CS50</a> 2016.
    </p>
    <b-btn variant="primary" to="/form">Get Started</b-btn>
  </b-jumbotron>
</template>

<script>
export default {
}
</script>

<style>
</style>
