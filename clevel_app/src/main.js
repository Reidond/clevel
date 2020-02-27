import Vue from 'vue';
import VuetifyDialog from 'vuetify-dialog';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify-dialog/dist/vuetify-dialog.css';

Vue.config.productionTip = false;

Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
