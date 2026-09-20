import * as firebase from 'firebase/app';
import 'firebase/auth';

import '@/db'; // initializes the Firebase app before auth() is used

import Admin from '@/components/Admin.vue';
import AuthorizationError from '@/components/AuthorizationError.vue';
import Stats from '@/components/Stats.vue';
import Years from '@/components/Years.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/admin', component: Admin },
  { path: '/years/:year', component: Years },
  { path: '/years/', component: Years },
  { path: '/stats/', component: Stats },
  { path: '/authorization-error', component: AuthorizationError },
  { path: '*', redirect: '/years/' }
];

export const router = new VueRouter({
  routes
});

/**
 * Firebase restores persisted sessions and completes pending
 * signInWithRedirect flows asynchronously, so currentUser is null for a
 * moment after page load. Wait for the first auth state event before
 * deciding whether an anonymous sign-in is needed - otherwise the anonymous
 * user replaces the user that just signed in via redirect.
 */
const authStateResolved = new Promise<void>(resolve => {
  const unsubscribe = firebase.auth().onAuthStateChanged(() => {
    unsubscribe();
    resolve();
  });
});

router.beforeEach(async (to, from, next) => {
  try {
    await authStateResolved;
    if (!firebase.auth().currentUser) {
      await firebase.auth().signInAnonymously();
    }
    next();
  } catch (error) {
    console.error('Unable to authorize to firebase.', error);
    next('/authorization-error');
  }
});
