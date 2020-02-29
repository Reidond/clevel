import { v4 as uuidv4 } from 'uuid';

const SET_CURRENT_MODEL = 'SET_CURRENT_MODEL';
const PUSH_TO_MODELS = 'PUSH_TO_MODELS';
const REMOVE_MODEL = 'REMOVE_MODEL';
const PUSH_QUESTION = 'PUSH_QUESTION';
const SET_QUESTION = 'SET_QUESTION';
const SET_SETTINGS = 'SET_SETTINGS';

const models = {
  state: {
    currentModel: {},
    models: {
      meta: {
        experts: null,
        modelsCount: null,
              },
      data: [],
              },
              },
              {
                answer: 'Керівник вищої ланки',
                score: 25,
              },
              {
                answer: 'Топ менеджер',
                score: 30,
              },
            ],
          },
          {
            question: 'Теоретичний рівень підготовки',
            answers: [
              {
                answer: 'Бакалавр',
                score: 15,
              },
              {
                answer: 'Магістр',
                score: 20,
              },
              {
                answer: 'Кандидат наук',
                score: 25,
              },
              {
                answer: 'Доктор наук',
                score: 30,
              },
            ],
          },
          {
            question: 'Імідж в ділових колах',
            answers: [
              {
                answer: 'Маловідома в ділових колах людина',
                score: 10,
              },
              {
                answer: 'Людина, визнана фахівцем в окремій галузі',
                score: 20,
              },
              {
                answer: 'Людина, визнана фахівцем у кількох галузях',
                score: 25,
              },
              {
                answer: 'Широковизнанна в ділових колах людина',
                score: 30,
              },
            ],
            expertAnswer: 10,
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Модель спеціальних вмінь і навичок',
        a: 60,
        b: 220,
        T: 190,
        p: 10,
        questions: [
          {
            question: 'Рівень знань API-driven Single Page Apps',
            answers: [
              {
                answer: 'Низький',
                score: 10,
              },
              {
                answer: 'Середній',
                score: 15,
              },
              {
                answer: 'Вище середнього',
                score: 30,
              },
              {
                answer: 'Високий',
                score: 40,
              },
            ],
            expertAnswer: 40,
          },
          {
            question: 'Рівень знань MySQL',
            answers: [
              {
                answer: 'Низький',
                score: 15,
              },
              {
                answer: 'Середній',
                score: 20,
              },
              {
                answer: 'Вище середнього',
                score: 35,
              },
              {
                answer: 'Високий',
                score: 40,
              },
            ],
            expertAnswer: 40,
          },
          {
            question: 'Рівень знань JavaScript',
            answers: [
              {
                answer: 'Низький',
                score: 15,
              },
              {
                answer: 'Середній',
                score: 20,
              },
              {
                answer: 'Вище середнього',
                score: 25,
              },
              {
                answer: 'Високий',
                score: 40,
              },
            ],
          },
          {
            question: 'Рівень знань C# і/або .NET',
            answers: [
              {
                answer: 'Низький',
                score: 10,
              },
              {
                answer: 'Середній',
                score: 20,
              },
              {
                answer: 'Вище середнього',
                score: 35,
              },
              {
                answer: 'Високий',
                score: 50,
              },
            ],
          },
          {
            question: 'Рівень знань Python',
            answers: [
              {
                answer: 'Низький',
                score: 10,
              },
              {
                answer: 'Середній',
                score: 20,
              },
              {
                answer: 'Вище середнього',
                score: 40,
              },
              {
                answer: 'Високий',
                score: 50,
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Модель психофізіологічних якостей особистості',
        a: 20,
        b: 180,
        T: 140,
        p: 9,
        questions: [
          {
            question:
              'Коли між людьми відбувається конфлікт на ґрунті ідей, я віддаю перевагу тій стороні, що',
            answers: [
              {
                answer:
                  'приймає, визнає конфлікт і намагається висловити його відкрито',
                score: 0,
              },
              {
                answer: 'більше за інших зачіпає мої власні цінності та ідеали',
                score: 15,
              },
              {
                answer:
                  'краще за інших відображає мої особисті погляди і досвід',
                score: 20,
              },
              {
                answer: 'викладає аргументи найбільш коротко і переконливо',
                score: 40,
              },
            ],
          },
          {
            question:
              'Коли я починаю працювати над проектом у складі групи, найважливіше для мене',
            answers: [
              {
                answer: 'зрозуміти мету і значення цього проекту',
                score: 5,
              },
              {
                answer: 'розкрити мету і цінності учасників робочої групи',
                score: 22,
              },
              {
                answer: 'визначити, як ми збираємося розробляти даний проект',
                score: 25,
              },
              {
                answer:
                  'щоб робота над проектом була організована і зрушила з місця',
                score: 30,
              },
            ],
          },
          {
            question:
              'Говорячи в цілому, я засвоюю нові ідеї найкраще, коли можу',
            answers: [
              {
                answer: 'застосувати їх до конкретних ситуацій',
                score: 5,
              },
              {
                answer: 'зосередитися на них і ретельно їх проаналізувати',
                score: 10,
              },
              {
                answer: 'зрозуміти, наскільки вони подібні до звичних ідей',
                score: 25,
              },
              {
                answer: 'протиставити їх іншим ідеям',
                score: 30,
              },
            ],
          },
          {
            question:
              'Коли я читаю звіт про роботу, я звертаю найбільше уваги на',
            answers: [
              {
                answer: 'близькість висновків до мого особистого досвіду',
                score: 5,
              },
              {
                answer: 'можливість виконання даних рекомендацій',
                score: 10,
              },
              {
                answer:
                  'надійність і обґрунтованість результатів фактичними даними',
                score: 30,
              },
              {
                answer: 'розуміння автором цілей та завдань роботи',
                score: 40,
              },
            ],
          },
          {
            question:
              'Коли переді мною поставлено завдання, перше, про що я хочу довідатися - це',
            answers: [
              {
                answer: 'який найкращий метод для вирішення даного завдання',
                score: 5,
              },
              {
                answer: 'кому і коли потрібно, щоб це завдання було вирішене',
                score: 15,
              },
              {
                answer: 'чому це завдання варто вирішувати',
                score: 30,
              },
              {
                answer:
                  'яка пряма, негайна користь від вирішення даного завдання',
                score: 40,
              },
            ],
          },
        ],
      },
    ],
  },
  mutations: {
    [SET_CURRENT_MODEL]: (state, { model }) => {
      state.currentModel = model;
    },
    [PUSH_TO_MODELS]: (state, { model }) => {
      state.models.push(model);
    },
    [REMOVE_MODEL]: (state, { id }) => {
      state.models = [...state.models.filter(model => model.id !== id)];
    },
    [PUSH_QUESTION]: (state, { id, question }) => {
      state.models = [
        ...state.models.map(model => {
          if (model.id === id) {
            model.questions.push(question);
          }

          return model;
        }),
      ];
    },
    [SET_QUESTION]: (state, { id, index, item }) => {
      state.models = [
        ...state.models.map(model => {
          if (model.id === id) {
            Object.assign(model.questions[index], item);
          }

          return model;
        }),
      ];
    },
    [SET_SETTINGS]: (state, { id, a, b, T, p }) => {
      state.models = [
        ...state.models.map(model => {
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
  },
};

export default models;
