const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAxj9nnza5T2Em-0rl0r-iTw4jz164nvUc",
    authDomain: "spark-project-f8dfe.firebaseapp.com",
    databaseURL: "https://spark-project-f8dfe.firebaseio.com",
    projectId: "spark-project-f8dfe",
    storageBucket: "spark-project-f8dfe.appspot.com",
    messagingSenderId: "219622150961",
    appId: "1:219622150961:web:7f123be9831ed739"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default db;