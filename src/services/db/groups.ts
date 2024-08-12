import { addDoc, getDocs, collection } from "firebase/firestore";

import { IGroup } from "../../types/models";
import { db } from "../firebase";

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
