import { addDoc, getDocs, collection, getDoc, doc, deleteDoc } from "firebase/firestore";

import { IGroup } from "../../types/models";
import { db } from "../firebase";
import { getImage } from "./images";

const groupsCollection = collection(db, "groups");

export async function createGroup(group: IGroup) {
  const docRef = await addDoc(groupsCollection, group);
  return docRef.id;
}

export async function fetchGroups() {
  const snapshot = await getDocs(groupsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IGroup[];
}

export async function fetchGroup(id: string) {
  const document = await getDoc(doc(groupsCollection, id));
  const group = document.exists()
    ? ({ ...document.data(), id: document.id } as IGroup)
    : null;

  if (group) {
    group.leaderPhoto = (await getImage(`groups.${id}.leader.jpg`)) || "";
    group.assistantPhoto = (await getImage("groups.${id}.assistant.jpg")) || "";
  }

  return group;
}

export async function deleteGroup(id: string) { 
  await deleteDoc(doc(groupsCollection, id));
}
