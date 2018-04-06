<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col lg="4" md="6" sm="12">
        <b-list-group>
          <b-list-group-item active>
          Questions Only
          </b-list-group-item>
          <b-list-group-item v-for="(equation, index) in equationArray" key="index">
            {{ equation.question }} = 
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col lg="4" md="6" sm="12">
        <b-list-group>
          <b-list-group-item active>
            With Answers
            <b-button class="float-right" size="sm" @click="hideAnswers = !hideAnswers">
              hide answers
            </b-button>
          </b-list-group-item>
          <b-list-group-item v-for="(equation, index) in equationArray" key="index">
            {{ equation.question }} = {{ !hideAnswers ? equation.answer : '' }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col lg="8" md="10" sm="12">
        <b-button class="float-right" @click="download" variant="outline-secondary">
          Download as .txt
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      hideAnswers: false
    }
  },
  computed: {
    equationArray () {
      return this.$store.getters.equationArray
    }
  },
  methods: {
    download (evt) {
      const filename = 'mathmaker.txt'
      let content = 'MathMaker.8bitEphod.com\n\n'
      content += 'Questions Only:\n'
      for (let i = 0; i < this.equationArray.length; i++) {
        content += `${i + 1}. ${this.equationArray[i].question} = \n`
      }
      content += '\nWith Answers:\n'
      for (let i = 0; i < this.equationArray.length; i++) {
        content += `${i + 1}. ${this.equationArray[i].question} = ${this.equationArray[i].answer}\n`
      }
      content += `\nGenerated ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
      this.downloadFile(filename, content)
    },
    downloadFile (filename, text) {
      let element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }
}
</script>

<style>
</style>
