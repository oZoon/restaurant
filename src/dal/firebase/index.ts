import { initializeApp } from "firebase/app"
import { getDatabase, ref, set } from "firebase/database"

import {
  apiKey,
  appId,
  databaseURL,
  authDomain,
  measurementId,
  messagingSenderId,
  projectId,
  storageBucket,
} from "@/constants"

const firebaseConfig = {
  apiKey,
  databaseURL,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase()

export const setNode = async (node: string, data: object) => {
  const refNode = ref(db, node)
  set(refNode, data)
}
