<template
  ><v-container fluid
    ><v-row><v-col cols="4"></v-col></v-row
  ></v-container>
</template>

<script>
export default {
  name: 'Main',
  data: () => ({
    models: [
      {
        name: 'Модель самооцінки',
        questions: [
          {
            question: 'Досвід роботи',
            answers: [
              {
                answer: 'До 3 років',
                score: 10,
              },
              {
                answer: 'З 3 до 5 років',
                score: 15,
              },
              {
                answer: 'З 5 до 10 років',
                score: 20,
              },
              {
                answer: 'Більше 10 років',
                score: 30,
              },
            ],
            expertAnswer: 20,
          },
        ],
      },
    ],
  }),
};
</script>
