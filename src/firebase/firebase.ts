import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';
var firebaseConfig = {
    apiKey: "AIzaSyAwAUX9CMn1XEqvJapVmCQE7ht_gp5KV8w",
    authDomain: "etourguide-d79a1.firebaseapp.com",
    projectId: "etourguide-d79a1",
    storageBucket: "etourguide-d79a1.appspot.com",
    messagingSenderId: "972054030084",
    appId: "1:972054030084:web:f5adf03b092cccb306d251",
    measurementId: "G-YERJKYLHCR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral
firebase.analytics();
const storage = firebase.storage();

export { storage, firebase as default };
