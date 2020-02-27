import Vue from 'vue';
import Vuex from 'vuex';
import modelsModule from './modules/models';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    modelsModule,
  },
});
