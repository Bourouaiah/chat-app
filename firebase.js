import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDce2b5z6xzn3KyQ3lxfTci8HaQOODzh3E",
  authDomain: "chat-app-8c446.firebaseapp.com",
  projectId: "chat-app-8c446",
  storageBucket: "chat-app-8c446.appspot.com",
  messagingSenderId: "392425034016",
  appId: "1:392425034016:web:438b116a53574d35234745"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);