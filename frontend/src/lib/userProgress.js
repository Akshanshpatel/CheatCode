import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

// Create user doc if not exists
export async function createUserIfNotExists(user) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      solvedCount: 0,
      solvedProblems: {},
      createdAt: Date.now(),
    });
  }
}

// Mark a problem solved
export async function markSolved(uid, problemId) {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    [`solvedProblems.${problemId}`]: true,
    solvedCount: increment(1),
    updatedAt: Date.now(),
  });
}

// Get progress
export async function getUserProgress(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data();
}
