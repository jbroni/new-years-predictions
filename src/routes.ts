import * as firebase from 'firebase';

import Years from '@/components/Years.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/years/:year', component: Years },
  { path: '/years/', component: Years },
  { path: '*', redirect: '/years/' }
];

export const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (!firebase.auth().currentUser) {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => next())
      .catch(error => console.error('Unable to authorize to firebase.', error));
  } else {
    next();
  }
});
