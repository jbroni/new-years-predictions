import YearPicker from '@/components/YearPicker.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueRouter);

const routes = [{ path: '/', component: YearPicker }];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
