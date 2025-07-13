// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyASLVWKdiFKcIbjYcO23dcf6SpJA-8Tecw',
	authDomain: 'nanel-journal-app.firebaseapp.com',
	projectId: 'nanel-journal-app',
	storageBucket: 'nanel-journal-app.firebasestorage.app',
	messagingSenderId: '443386682611',
	appId: '1:443386682611:web:8ce237271608f6ac0e2b86',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
