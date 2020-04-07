import Years from '@/components/Years.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{ path: '/years/:year', component: Years }];

export const router = new VueRouter({
  routes
});
