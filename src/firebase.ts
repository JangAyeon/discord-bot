// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, collection} from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCocD4F3ptzm-pm36y-8uuGOudQSkxcOg",
  authDomain: "help-discord-bot.firebaseapp.com",
  projectId: "help-discord-bot",
  storageBucket: "help-discord-bot.appspot.com",
  messagingSenderId: "1082685696461",
  appId: "1:1082685696461:web:83c243579acc2076adfc84",
  measurementId: "G-BSVWJTK9EN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createTicket(threadId:string, text:string){
  try{
    await addDoc(collection(db,"tickets"),{
      threadId,
      text,
      openedAt:Date()
    } )
  }catch(e){
    console.log("Error Adding Document: ", e)
  }
}