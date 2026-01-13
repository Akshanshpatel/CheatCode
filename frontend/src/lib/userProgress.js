import { doc, getDoc, setDoc, updateDoc, increment,deleteField } from "firebase/firestore";
import { db } from "../firebase";



// Create user doc if not exists
export async function createUserIfNotExists(user) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      solvedCount: 0,
      solvedProblems: {},
      stars:{},
    });
  }
}

// Mark a problem solved
export async function toggleSolved(uid, problemId, isSolved) {
  const ref = doc(db, "users", uid);
  
  if (isSolved) {
    // UNSOLVE → decrement
    await updateDoc(ref, {
      [`solvedProblems.${problemId}`]: deleteField(),
      solvedCount: increment(-1),
    });
  } else {
    // SOLVE → increment
    await updateDoc(ref, {
      [`solvedProblems.${problemId}`]: true,
      solvedCount: increment(1),
    });
  }
}

//toggleStar function

export async function toggleStarred(uid, problemId, isStarred) {
  const ref = doc(db, "users", uid);

  if (isStarred) {
    // unstar
    await updateDoc(ref, {
      [`stars.${problemId}`]: deleteField(),
    });
  } else {
    // star
    await updateDoc(ref, {
      [`stars.${problemId}`]: true,
    });
  }
}



// Get progress
export async function getUserProgress(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data();
}


