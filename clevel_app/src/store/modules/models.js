const SET_CURRENT_MODEL = 'SET_CURRENT_MODEL';
const PUSH_TO_MODELS = 'PUSH_TO_MODELS';
const REMOVE_MODEL = 'REMOVE_MODEL';
const PUSH_QUESTION = 'PUSH_QUESTION';
const SET_QUESTION = 'SET_QUESTION';
const SET_SETTINGS = 'SET_SETTINGS';
const SET_MODEL = 'SET_MODEL';
const SET_FILE = 'SET_FILE';

const models = {
  state: {
    file: null,
    currentModel: {},
    models: {
      meta: {
        experts: null,
        modelsCount: null,
      },
      data: [],
    },
  },
  mutations: {
    [SET_CURRENT_MODEL]: (state, { model }) => {
      state.currentModel = model;
    },
    [SET_MODEL]: (state, { model }) => {
      state.models = model;
    },
    [SET_FILE]: (state, { file }) => {
      state.file = file;
    },
    [PUSH_TO_MODELS]: (state, { model }) => {
      state.models.data.push(model);
    },
    [REMOVE_MODEL]: (state, { id }) => {
      state.models.data = [
        ...state.models.data.filter(model => model.id !== id),
      ];
    },
    [PUSH_QUESTION]: (state, { id, question }) => {
      state.models.data = [
        ...state.models.data.map(model => {
          if (model.id === id) {
            model.questions.push(question);
          }

          return model;
        }),
      ];
    },
    [SET_QUESTION]: (state, { id, index, item }) => {
      state.models.data = [
        ...state.models.data.map(model => {
          if (model.id === id) {
            Object.assign(model.questions[index], item);
          }

          return model;
        }),
      ];
    },
    [SET_SETTINGS]: (state, { id, a, b, T, p }) => {
      state.models.data = [
        ...state.models.data.map(model => {
          if (model.id === id) {
            return { a, b, T, p, ...model };
          }

          return model;
        }),
      ];
    },
  },
  actions: {
    setCurrentModel({ commit }, model) {
      commit(SET_CURRENT_MODEL, { model });
    },
    pushToModel({ commit }, model) {
      commit(PUSH_TO_MODELS, { model });
    },
    pushQuestion({ commit }, { id, question }) {
      commit(PUSH_QUESTION, { id, question });
    },
    setQuestion({ commit }, { id, index, item }) {
      commit(SET_QUESTION, { id, index, item });
    },
    removeModel({ commit }, id) {
      commit(REMOVE_MODEL, { id });
    },
    setSettings({ commit }, { id, a, b, T, p }) {
      commit(SET_SETTINGS, { id, a, b, T, p });
    },
    setModel({ commit }, { model }) {
      commit(SET_MODEL, { model });
    },
    setFile({ commit }, { file }) {
      commit(SET_FILE, { file });
    },
  },
};

export default models;
