import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export async function uploadFile(file: File, fileName: string): Promise<void> {
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
}

export async function getFileUrl(fileName: string): Promise<string> {
  const storageRef = ref(storage, fileName);
  return getDownloadURL(storageRef);
}
