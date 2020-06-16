import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jsondata: [],
    userid: 0,
    accountid: 0,
    showSearchOverlay: false,
    showSearchResults: false,
    showSearchSettings: false,
    searchLocal: true,
    searchGlobal: false,
    searchDataLocal: [],
    searchDataGlobal: [],
    sideOpen: false,
    donutHoverId: -1
  },
  mutations: {
    setJsonData (state, data) {
      state.jsondata = data
    },
    setUserId (state, id) {
      state.userid = id
    },
    setAccountId (state, id) {
      state.accountid = id
    },
    setShowSearchOverlay (state, bool) {
      state.showSearchOverlay = bool
    },
    setShowSearchResults (state, bool) {
      state.showSearchResults = bool
    },
    setSearchLocal (state, bool) {
      state.searchLocal = bool
    },
    setSearchGlobal (state, bool) {
      state.searchGlobal = bool
    },
    setSearchDataLocal (state, data) {
      state.searchDataLocal = data
    },
    setSearchDataGlobal (state, data) {
      state.searchDataGlobal = data
    },
    setShowSearchSettings (state, bool) {
      state.showSearchSettings = bool
    },
    setSideOpen (state, bool) {
      state.sideOpen = bool
    },
    setDonutHoverId (state, id) {
      state.donutHoverId = id
    }
  },
  actions: {
  },
  modules: {
  }
})
