import * as firebase from 'firebase';
import { firebaseConfig } from '../environments/firebase';

export const db = firebase.initializeApp(firebaseConfig).firestore();
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);
