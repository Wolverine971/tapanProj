import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api/generic.js'

Vue.use(Vuex)


export const state = {
    // selectableFacets: {}, //{}
    searchText: "",
    results: "",
    didyoumean: "",
    spellCheck: "",
    synonyms: ""

}

export const getters = {
    currentSelections(state){
        return state.currentSelections;
      },
    getResults(state) {
        return state.results
    },
    getDidYouMean(state) {
        return state.didyoumean
    },
    getSpellCheck(state) {
        return state.spellCheck
    },
    getSynonyms(state) {
        return state.synonyms
    },
}

export const actions = {
    search({ commit }, query) {
        API.search(query).then(response =>{
            commit('setResults', response.results)
            commit('setDidYouMean', response.didyoumean)
            commit('setSpellCheck', response.spellCheck)
            commit('setSynonyms', response.synonyms)
          
  
          })
      },
}

export const mutations = {

    setSearchText(state, value) {
        state.searchText = value
      },
    setResults(state, value) {
    state.results = value
    },
    setDidYouMean(state, value) {
    state.didyoumean = value
    },
    setSpellCheck(state, value) {
    state.spellCheck = value
    },
    setSynonyms(state, value) {
    state.synonyms = value
    },
}

export default new Vuex.Store({
    mutations,
    state,
    actions,
    getters

})