import { addDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";

import { ILeader } from "../../types/models";
import { db } from "../firebase";
import { getImage } from "./images";

const leaderCollection = collection(db, "leader");

export async function createLeader(group: ILeader) {
  const docRef = await addDoc(leaderCollection, group);
  return docRef.id;
}

export async function fetchLeaders() {
  const snapshot = await getDocs(leaderCollection);

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ILeader[];
}

export async function fetchLeader(id: string) {
  const document = await getDoc(doc(leaderCollection, id));
  const child = document.exists()
    ? ({ ...document.data(), id: document.id } as ILeader)
    : null;

  if (child) {
    child.photo = (await getImage(`leader.${id}.jpg`)) || "";
  }

  return child;
}
