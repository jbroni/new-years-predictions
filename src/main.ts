import Vue from 'vue';
import VueRouter from 'vue-router';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import Years from '@/components/Years.vue';

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueRouter);

const routes = [{ path: '/years/:year', component: Years }];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
