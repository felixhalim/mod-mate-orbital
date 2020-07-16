const firebase = require("firebase");

require("firebase/firestore");
require("firebase/auth");

firebase.initializeApp({
  apiKey: "AIzaSyCgnfGIGupk_mxG3DNAaCqUwoDzZYBVRQU",
  authDomain: "mod-mate.firebaseapp.com",
  databaseURL: "https://mod-mate.firebaseio.com",
  projectId: "mod-mate",
  storageBucket: "mod-mate.appspot.com",
  messagingSenderId: "620875162150",
  appId: "1:620875162150:web:bbe36fc1190597a9bebce7",
  measurementId: "G-QPG4GBC9C7",
});

const db = firebase.firestore();
const auth = firebase.auth();
const stor = firebase.storage();
const realdb = firebase.database();

module.exports = { firebase, db, auth, stor, realdb };
