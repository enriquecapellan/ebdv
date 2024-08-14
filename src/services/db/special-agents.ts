import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { ISpecialAgent } from "../../types/models";
import { db } from "../firebase";
import { getImage } from "./images";

const specialAgentsCollection = collection(db, "special-agents");

export async function createSpecialAgent(group: ISpecialAgent) {
  const docRef = await addDoc(specialAgentsCollection, group);
  return docRef.id;
}

export async function fetchSpecialAgents() {
  const snapshot = await getDocs(specialAgentsCollection);

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ISpecialAgent[];
}

export async function fetchSpecialAgent(id: string) {
  const document = await getDoc(doc(specialAgentsCollection, id));
  const specialAgent = document.exists()
    ? ({ ...document.data(), id: document.id } as ISpecialAgent)
    : null;

  if (specialAgent) {
    specialAgent.photo = (await getImage(`special-agents.${id}.jpg`)) || "";
  }

  return specialAgent;
}

export async function updateSpecialAgent({
  id,
  ...specialAgent
}: ISpecialAgent) {
  await updateDoc(doc(specialAgentsCollection, id), { ...specialAgent });
}

export async function deleteSpecialAgent(id: string) {
  await deleteDoc(doc(specialAgentsCollection, id));
}
