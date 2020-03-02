import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import modelsModule from './modules/models';
import testingModule from './modules/testing';

const vuexPersist = new VuexPersist({
  key: 'clevel-app',
  storage: window.localStorage,
  reducer: state => {
    const { showcaseMode, ...newState } = state;
    return newState;
  },
  filter: mutation => mutation.type !== 'SET_SHOWCASE_MODE',
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    showcaseMode: false,
  },
  mutations: {
    SET_SHOWCASE_MODE: (state, { showcaseMode }) => {
      state.showcaseMode = showcaseMode;
    },
  },
  actions: {
    setShowcaseMode({ commit }, showcaseMode) {
      commit('SET_SHOWCASE_MODE', { showcaseMode });
    },
  },
  modules: {
    modelsModule,
    testingModule,
  },
});
