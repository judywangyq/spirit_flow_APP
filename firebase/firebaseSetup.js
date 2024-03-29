// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, EmailAuthProvider, reauthenticateWithCredential  } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
} from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
const spiritFlowApp = initializeApp(firebaseConfig);
export const database = getFirestore(spiritFlowApp);
// export const auth = getAuth(spiritFlowApp);
export const auth = initializeAuth(spiritFlowApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
console.log(database);