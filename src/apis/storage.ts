import { ref, uploadBytes } from 'firebase/storage'
import firebaseStorage from '../../firebase/firebaseStorage'

export const uploadJsonStringToStorage = async (uploadPath: string, jsonString: string) => {
  const uploadRef = ref(firebaseStorage, uploadPath)

  const blob = new Blob([jsonString], { type: 'application/json' })
  await uploadBytes(uploadRef, blob)
}
