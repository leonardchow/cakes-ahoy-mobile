import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/firestore';
import 'firebase/database';

import { firebaseConfig } from './config.secret';

// Init Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Init auth
const auth = firebase.auth();
// const db = firebase.firestore();
const db = firebase.database();

// // FIRESTORE Disable deprecated features
// db.settings({
//     timestampsInSnapshots: true
// });

export {
    auth,
    db,
};
