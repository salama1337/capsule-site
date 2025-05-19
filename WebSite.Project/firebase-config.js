// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDW-qG3Ph5cuy8fLALPWbTWXR68qYRWT2o",
  authDomain: "capsule-admin-85e14.firebaseapp.com",
  projectId: "capsule-admin-85e14",
  storageBucket: "capsule-admin-85e14.appspot.com",
  messagingSenderId: "827933611543",
  appId: "1:827933611543:web:5ab6c6cfccb3becd296e52",
  measurementId: "G-V4PJ5GZBFB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
