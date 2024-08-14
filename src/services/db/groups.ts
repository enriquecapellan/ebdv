import { addDoc, getDocs, collection, getDoc, doc } from "firebase/firestore";

import { IGroup } from "../../types/models";
import { db } from "../firebase";
import { getFileBlob } from "../storage";
import { blobToBase64 } from "../../utils";

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
    const leaderBlob = await getFileBlob(`groups/${id}/leader.jpg`);
    group.leaderPhoto = await blobToBase64(leaderBlob);
    const assistantBlob = await getFileBlob(`groups/${id}/assistant.jpg`);
    if (assistantBlob) group.assistantPhoto = await blobToBase64(assistantBlob);
  }

  return group;
}
