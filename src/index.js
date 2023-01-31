// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-wb2LwX7nj5ChOGlcG9ygRqswlgAYImw",
  authDomain: "fir-workshop-fd9f6.firebaseapp.com",
  projectId: "fir-workshop-fd9f6",
  storageBucket: "fir-workshop-fd9f6.appspot.com",
  messagingSenderId: "627473734951",
  appId: "1:627473734951:web:f3b13a0c33a225ced89d02"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//init firestore service
const db = getFirestore()

//testing - get test collection from firebase
const testColRef = collection(db, 'test')

//get test collection data
getDocs(testColRef).then((snapshot) => {
    let testData = []
    snapshot.docs.forEach((doc) => {
        testData.push({ ...doc.data(), id: doc.id })
    })
    console.log(testData)
}).catch(err => {
    console.log(err.message)
})