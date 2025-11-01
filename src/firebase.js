import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDB3oCnVxiekgs1h7HxcsXu-pddiLs4mAo',
  authDomain: 'brainunload-2f04e.firebaseapp.com',
  projectId: 'brainunload-2f04e',
  storageBucket: 'brainunload-2f04e.appspot.com', // ✅ fixed here
  messagingSenderId: '541829129675',
  appId: '1:541829129675:web:6b16bc2aae8c732ae1824e',
  measurementId: 'G-PCFPWJ67WB',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
