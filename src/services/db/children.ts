import { addDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";

import { IChild } from "../../types/models";
import { db } from "../firebase";

const childrenCollection = collection(db, "children");

export async function createChild(group: IChild) {
  const docRef = await addDoc(childrenCollection, group);
  return docRef.id;
}

export async function fetchChildren() {
  const snapshot = await getDocs(childrenCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IChild[];
}

export async function fetchChild(id: string) {
  const document = await getDoc(doc(childrenCollection, id));
  return document.exists()
    ? ({ ...document.data(), id: document.id } as IChild)
    : null;
}
