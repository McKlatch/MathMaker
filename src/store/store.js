import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    // preferences set by user
    formInput: {
      questionQuantity: 0,
      includeOperators: [],
      constants: [
        {
          range: [0, 0],
          multiples: []
        },
        {
          range: [0, 0],
          multiples: []
        },
        {
          range: [],
          multiples: []
        }
      ],
      subtractionVars: {
        includeNegativeAns: false,
        onlyNegativeAns: false
      },
      divisionVars: {
        wholeAnsOnly: false,
        modularRemainders: false,
        fractionRemainders: false, // 0.5 => ½, 0.25 => ¼, 0.75 => ¾ only
        decimalPlaces: 0
      },
      presentationVars: {
        inWords: false, // eg. nine plus seven
        includeUnits: [], // eg. £/cm
        showPlaceValues: false, // ie. H T O t h th
        missingNumber: false, // eg. "16 – ⬜ = 7"
        variableForms: false // eg. "7 = 16 – ⬜"
      }
    },
    // preferences set by default
    formDefaults: {
      questionQuantity: 20,
      includeOperators: ['➕', '➖'],
      constants: [
        {
          range: [0, 20],
          multiples: []
        },
        {
          range: [0, 20],
          multiples: []
        },
        {
          range: [],
          multiples: []
        }
      ],
      subtractionVars: {
        includeNegativeAns: false,
        onlyNegativeAns: false
      },
      divisionVars: {
        wholeAnsOnly: true,
        modularRemainders: true,
        fractionRemainders: false, // 0.5 => ½, 0.25 => ¼, 0.75 => ¾ only
        decimalPlaces: 2
      },
      presentationVars: {
        inWords: false, // eg. nine plus seven
        includeUnits: [], // eg. £/cm
        showPlaceValues: false, // ie. H T O t h th
        missingNumber: false, // eg. "16 – ⬜ = 7"
        variableForms: false // eg. "7 = 16 – ⬜"
      }
    },
    // preference boundaries
    formOptions: {
      questionQuantity: {
        min: 0,
        max: 100
      },
      includeOperators: [
        '➕', '➖', '✖'
      ],
      constantRange: {
        min: 0,
        max: 999
      },
      constantMultiples: [
        '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '20', '100', '200'
      ],
      includeUnits: {
        prepend: [
          '£', '€', '$'
        ],
        append: [
          'p', '¢', '¥', 'cm', 'm', 'g', 'Kg', 'ml', 'L', 's', 'min', 'hr', '°C'
        ]
      }
    }
  },
  mutations: {
    resetAllInputs (state) {
      state.formInput = JSON.parse(JSON.stringify(state.formDefaults))
    },
    updateQuantity (state, value) {
      state.formInput.questionQuantity = value
    },
    updateOperators (state, value) {
      state.formInput.includeOperators = value
    },
    updateRange (state, payload) {
      state.formInput.constants[payload.constant].range = payload.value
    },
    updateMultiples (state, payload) {
      state.formInput.constants[payload.constant].multiples = payload.value
    },
    updateNegativeAns (state, value) {
      state.formInput.subtractionVars.includeNegativeAns = value
    },
    updatewholeAnsOnly (state, value) {
      state.formInput.divisionVars.wholeAnsOnly = value
    },
    updatemodularRemainders (state, value) {
      state.formInput.divisionVars.modularRemainders = value
    }
  },
  actions: {
    resetAllInputs ({ commit }) {
      commit('resetAllInputs')
    },
    updateQuantity ({ commit }, value) {
      commit('updateQuantity', value)
    },
    updateOperators ({ commit }, value) {
      commit('updateOperators', value)
    },
    updateRange ({ commit }, payload) {
      commit('updateRange', payload)
    },
    updateMultiples ({ commit }, payload) {
      commit('updateMultiples', payload)
    },
    updateNegativeAns ({ commit }, value) {
      commit('updateNegativeAns', value)
    },
    updatewholeAnsOnly ({ commit }, value) {
      commit('updatewholeAnsOnly', value)
    },
    updatemodularRemainders ({ commit }, value) {
      commit('updatemodularRemainders', value)
    }
  },
  getters: {
    constantMultiplesOptions: (state) => (constantNo) => {
      // options for multiples within scope of constant range
      return state.formOptions.constantMultiples.filter(multiple =>
        multiple <= state.formInput.constants[constantNo].range[1]
      )
    },
    constantsAvailable: (state) => {
      let cConstants = 0
      if (state.formInput.constants[0].range.length !== 0) {
        cConstants++
      }
      if (state.formInput.constants[1].range.length !== 0) {
        cConstants++
      }
      if (state.formInput.constants[2].range.length !== 0) {
        cConstants++
      }
      return cConstants
    },
    equationArray: (state, getters) => {
      // get demanded quantity and open empty array for equations
      const quantity = state.formInput.questionQuantity
      let equations = []

      // generate constant based on user prerequisites
      const constant = (num, op, constant0 = 0) => {
        let min = state.formInput.constants[num].range[0]
        let max = state.formInput.constants[num].range[1]

        // conditions for subtraction
        if (num === 1 && op === '➖') {
          if (!state.formInput.subtractionVars.includeNegativeAns) {
            max = constant0
          }
          if (state.formInput.subtractionVars.onlyNegativeAns) {
            min = constant0
          }
        }

        if (state.formInput.constants[num].multiples.length === 0) {
          return Math.floor(Math.random() * ((max - min) + 1) + min)
        } else {
          let selectedMultiple = state.formInput.constants[num].multiples[Math.floor(Math.random() * state.formInput.constants[num].multiples.length)]
          min /= selectedMultiple
          max /= selectedMultiple
          return (Math.floor(Math.random() * ((max - min) + 1) + min)) * selectedMultiple
        }
      }

      // change emoji symbols to computing operators
      const deMoji = op => {
        return { '➕': '+', '➖': '-', '✖': '*', '➗': '/' }[op]
      }

      // change computing operator emoji symbol
      const reMoji = op => {
        return { '+': '➕', '-': '➖', '*': '✖', '/': '➗' }[op]
      }

      // populate array
      for (let i = 0; i < quantity; i++) {
        // generate operator from user options
        let operator = state.formInput.includeOperators[Math.floor(Math.random() * state.formInput.includeOperators.length)] || '➕'

        // generate first constant
        let constant0 = constant(0, operator)

        // generate second constant
        let constant1 = constant(1, operator, constant0)

        // assemble question
        let question = `${constant0} ${deMoji(operator)} ${constant1}`

        // evaluate answer
        // eslint-disable-next-line
        let answer = eval(question)
        question = question.replace(/\+|-|\*|\//gi, op => reMoji(op))

        // append to array
        equations.push({ question, answer })
      }

      return equations
    }
  }
})
