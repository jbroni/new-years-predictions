import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../environments/firebase';

/**
 * The OAuth redirect flow reads the pending sign-in state back from storage on
 * authDomain. When authDomain is a different site than the one serving the app,
 * mobile browsers block that cross-site access and the redirect comes back with
 * no user and no error, so point it at the current host instead. Firebase
 * Hosting serves the /__/auth/handler endpoint on every domain of the project.
 * Local development keeps the configured authDomain, as localhost serves no
 * handler of its own.
 */
const isHostingDomain = /\.(web\.app|firebaseapp\.com)$/.test(
  window.location.hostname
);

export const db = firebase
  .initializeApp({
    ...firebaseConfig,
    authDomain: isHostingDomain
      ? window.location.hostname
      : firebaseConfig.authDomain
  })
  .firestore();
