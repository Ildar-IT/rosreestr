import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: null,
    item: null,
  },
  getters: {
    items(state) {
      return state.items;
    },
    item(state) {
      return state.item;
    },
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setItem(state, item) {
      state.item = item;
    },
  },
  actions: {
    fetchItems({commit}, url) {
      return axios.get(url)
          .then(response => commit("setItems", response.data))
          .catch((err) => console.error(err));
    },
    fetchItem({commit}, url) {
      return axios.get(url)
          .then(response => commit("setItem", response.data))
          .catch((err) => console.error(err));
    },
  },
  modules: {
  }
})
