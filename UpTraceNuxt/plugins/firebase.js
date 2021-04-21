import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConf = {
    apiKey: "AIzaSyA91ZwBIr0v9U3ArzFhNvBT9rttRRTAp7U",
    authDomain: "uptraceuofm.firebaseapp.com",
    projectId: "uptraceuofm",
    storageBucket: "uptraceuofm.appspot.com",
    messagingSenderId: "181559941431",
    appId: "1:181559941431:web:d19bdca95d1a3e3ba122b2",
    measurementId: "G-CQ2B4N2J53"
}


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConf)
}

export const authProviders = {
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID
}
export const fireDb = firebase.firestore()
export const fireAuth = firebase.auth()
