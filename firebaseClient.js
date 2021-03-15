const firebase = require("firebase");

const FIREBASE_CONFIG = {
    
        apiKey: "AIzaSyBJaGsbyivK0Vf2USOpA5JHa9Jk55qQXMg",
        authDomain: "wrestlingpredictions-17106.firebaseapp.com",
        databaseURL: "https://wrestlingpredictions-17106-default-rtdb.firebaseio.com/",
        projectId: "wrestlingpredictions-17106",
        storageBucket: "wrestlingpredictions-17106.appspot.com",
        messagingSenderId: "519605884425",
        appId: "1:519605884425:web:33339bf37ccbca31330ad8",
        measurementId: "G-93ER8831G7"

      
}

export default function firebaseClient(){
    if (!firebase.apps.length){
        firebase.initializeApp(FIREBASE_CONFIG);
    }
}