import firebaseApp from './firebase'
import { getFirestore } from 'firebase/firestore'

const fireStore = getFirestore(firebaseApp)
export default fireStore
