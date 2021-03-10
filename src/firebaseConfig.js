import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAYEkFdyXOR_qrXH2_JBhhKDKPu9n4Rc5g",
    authDomain: "gtdapp-6e9d0.firebaseapp.com",
    projectId: "gtdapp-6e9d0",
    storageBucket: "gtdapp-6e9d0.appspot.com",
    messagingSenderId: "545393890835",
    appId: "1:545393890835:web:b76d9ef8797f0751dcd1e6"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsinSnapshots: true});

export default firebase;