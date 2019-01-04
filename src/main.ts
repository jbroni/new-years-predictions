import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueFire);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
