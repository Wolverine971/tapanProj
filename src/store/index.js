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
    synonym: ""

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
    getSynonym(state) {
        return state.synonym
    },
}

export const actions = {
    search({ commit }, query) {
        API.search(query).then(response =>{
            commit('setResults', response.results)
            commit('setDidYouMean', response.didyoumean)
            commit('setSpellCheck', response.spellCheck)
            commit('setSynonym', response.synonym)
          
  
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
    setSynonym(state, value) {
    state.synonym = value
    },
}

export default new Vuex.Store({
    mutations,
    state,
    actions,
    getters

})