import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Place Firebase Config data for the project here

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsinSnapshots: true});

export default firebase;