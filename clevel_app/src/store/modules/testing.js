import { v4 as uuidv4 } from 'uuid';

const PUSH_TO_EXPERTS = 'PUSH_TO_EXPERTS';
const SET_EXPERTS = 'SET_EXPERTS';
const SET_CURRENT_EXPERT = 'SET_CURRENT_EXPERT';

const testing = {
  state: {
    currentExpert: {},
    experts: [],
  },
  mutations: {
    [PUSH_TO_EXPERTS]: (state, { expert }) => {
      state.experts.push(expert);
    },
    [SET_EXPERTS]: (state, { experts }) => {
      state.experts = experts;
    },
    [SET_CURRENT_EXPERT]: (state, { expert }) => {
      state.currentExpert = expert;
    },
  },
  actions: {
    pushToExperts({ commit }, expert) {
      commit(PUSH_TO_EXPERTS, { expert });
    },
    setExperts({ commit }, experts) {
      commit(SET_EXPERTS, { experts });
    },
    setCurrentExpert({ commit }, expert) {
      commit(SET_CURRENT_EXPERT, { expert });
    },
    completeModel({ commit, state }, { expert, model }) {
      const experts = [
        ...state.experts.map(val => {
          if (val.id === expert.id) {
            const completedModels = [...val.completedModels, model];
            return { ...val, completedModels };
          }

          return val;
        }),
      ];

      commit(SET_EXPERTS, { experts });
    },
    generateExperts({ commit, rootState }) {
      const expertsCount = rootState.modelsModule.models.meta.experts;
      const experts = [...Array(expertsCount).keys()].map(c => {
        return {
          id: uuidv4(),
          name: `Expert ${c + 1}`,
          completedModels: [],
        };
      });
      commit(SET_EXPERTS, { experts });
    },
  },
};

export default testing;
