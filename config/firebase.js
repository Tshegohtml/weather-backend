const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
//const dotenv = require("dotenv");
const { getAuth } = require("firebase/auth");


//dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyDfXzG0C9Mvcoden55En7DdbnqcFffklRA",
    authDomain: "weather-travel-planner.firebaseapp.com",
    projectId: "weather-travel-planner",
    storageBucket: "weather-travel-planner.firebasestorage.app",
    messagingSenderId: "282220410723",
    appId: "1:282220410723:web:982c6a0202ea4e71d34556",
    measurementId: "G-P96WQML885"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db,auth };