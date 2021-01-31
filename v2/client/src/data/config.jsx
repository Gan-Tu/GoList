import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// This is firebase configs, and API keys are meant to be public
const firebaseConfig = {
  apiKey: "AIzaSyC2dB2eriEnfGtvkzLzrmEzm6d6sudzvK8",
  authDomain: "golist-c3dce.firebaseapp.com",
  projectId: "golist",
  storageBucket: "golist.appspot.com",
  messagingSenderId: "473592493360",
  appId: "1:473592493360:web:3ceab37d7c9f6d8a4484f5",
  measurementId: "G-ZY70CF0E9Q",
};

export const firebase_app = firebase.initializeApp(firebaseConfig);
export const firebaseLocalPersistence = firebase.auth.Auth.Persistence.LOCAL;

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
