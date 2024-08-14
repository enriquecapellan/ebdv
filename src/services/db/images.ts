import { doc, getDoc, collection, setDoc } from "firebase/firestore";

import { db } from "../firebase";
import { blobToBase64 } from "../../utils";

const imagesCollection = collection(db, "images");

export async function updloadImage(image: File, fileName: string) {
  const docRef = doc(imagesCollection, fileName);
  const base64 = await blobToBase64(image);

  await setDoc(docRef, { base64 });
  return docRef.id;
}

export async function getImage(fileName: string) {
  const document = await getDoc(doc(imagesCollection, fileName));
  return document.exists()
    ? (document.data() as { base64: string }).base64
    : null;
}
