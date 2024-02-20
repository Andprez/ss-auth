import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";

// Inicialización de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDerZLo2Y-H1--qlQcmSPXYrVj2Lja4BKE",
  authDomain: "bizagi-auth.firebaseapp.com",
  projectId: "bizagi-auth",
  storageBucket: "bizagi-auth.appspot.com",
  messagingSenderId: "733364732030",
  appId: "1:733364732030:web:23161e5eec11085f7cd82f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export async function createUser(userData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;
    return await updateProfile(user, userData).then(() => {
      return user
    })
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { errorCode, errorMessage };
  }
}

export function currentUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user);
    } else {
      console.log("Ningún usuario logueado");
    }
  });
}

export function profileCurrentUser() {
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
    console.log({ displayName, email, photoURL, emailVerified, uid });
  } else {
    console.log("Ningún usuario logueado");
  }
}

export function loginUserAndPassword(email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('Signin', {user});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error al intentar login', errorMessage);
  });
}
