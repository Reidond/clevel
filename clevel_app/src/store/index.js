import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import modelsModule from './modules/models';

const vuexPersist = new VuexPersist({
  key: 'clevel-app',
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    modelsModule,
  },
});
