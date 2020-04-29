import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../environments/firebase';

export const db = firebase.initializeApp(firebaseConfig).firestore();
