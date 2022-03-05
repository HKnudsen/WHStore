import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, getDocs
} from 'firebase/firestore'



const contentSection = document.querySelector('#content');

let appData = {
  currentShipId: ""
}


const firebaseConfig = {
    apiKey: "AIzaSyBTf36TTI5BW8xpDQD0p58V4V6XZ7ix-R0",
    authDomain: "whstore-1ef88.firebaseapp.com",
    projectId: "whstore-1ef88",
    storageBucket: "whstore-1ef88.appspot.com",
    messagingSenderId: "168242384883",
    appId: "1:168242384883:web:fe9d257a79d71ec41d8c86"
  };

  // init firebase app
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();