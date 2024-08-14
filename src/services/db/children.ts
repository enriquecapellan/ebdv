import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  QuerySnapshot,
  DocumentData,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { IChild } from "../../types/models";
import { db } from "../firebase";
import { getImage } from "./images";

const childrenCollection = collection(db, "children");

export async function createChild(group: IChild) {
  const docRef = await addDoc(childrenCollection, group);
  return docRef.id;
}

export async function fetchChildren(groupId?: string) {
  let snapshot: QuerySnapshot<DocumentData, DocumentData>;
  if (groupId) {
    const q = query(childrenCollection, where("group.id", "==", groupId));
    snapshot = await getDocs(q);
  } else {
    snapshot = await getDocs(childrenCollection);
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IChild[];
}

export async function fetchChild(id: string) {
  const document = await getDoc(doc(childrenCollection, id));
  const child = document.exists()
    ? ({ ...document.data(), id: document.id } as IChild)
    : null;

  if (child) {
    child.photo = (await getImage(`children.${id}.jpg`)) || "";
  }

  return child;
}

export async function updateChild(id: string, child: IChild) {
  await updateDoc(doc(childrenCollection, id), { ...child });
}

export async function deleteChild(id: string) {
  await deleteDoc(doc(childrenCollection, id));
}
