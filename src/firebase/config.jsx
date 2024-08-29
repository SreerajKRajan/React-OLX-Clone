import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC5H-iOWziM_6qFcVYNqa-GPxuV5EuyvXM",
  authDomain: "olx-clone-react-f8e9b.firebaseapp.com",
  projectId: "olx-clone-react-f8e9b",
  storageBucket: "olx-clone-react-f8e9b.appspot.com",
  messagingSenderId: "522616829019",
  appId: "1:522616829019:web:0f6ed5fc95331566497b7e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
