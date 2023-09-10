import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBX3H7zFarF3_6qRtXnTZXV1C8YwkX2TMw',
  authDomain: 'go-it-jsproject.firebaseapp.com',
  databaseURL: 'https://go-it-jsproject-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'go-it-jsproject',
  storageBucket: 'go-it-jsproject.appspot.com',
  messagingSenderId: '1007965674240',
  appId: '1:1007965674240:web:662afb0a29e05da485b1e5',
  measurementId: 'G-7ZDF84XX9K',
};
  
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export const db = getFirestore(app);
export const storage = getStorage(app);