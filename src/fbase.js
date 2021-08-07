import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB90i6uZWZZ087x4o9G6Cqbr69Saonlx4Y",
    authDomain: "clone-11d39.firebaseapp.com",
    projectId: "clone-11d39",
    storageBucket: "clone-11d39.appspot.com",
    messagingSenderId: "874187345347",
    appId: "1:874187345347:web:c29a43340e5236fcd9c176"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
