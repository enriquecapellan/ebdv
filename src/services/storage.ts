import { ref, uploadBytes, getDownloadURL, getBlob } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadFile(file: File, fileName: string): Promise<void> {
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
}

export async function getFileUrl(fileName: string): Promise<string> {
  const storageRef = ref(storage, fileName);
  return getDownloadURL(storageRef);
}

export async function getFileBlob(fileName: string): Promise<Blob> {
  const storageRef = ref(storage, fileName);
  const blob = await getBlob(storageRef);
  return blob;
}
