import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

import { auth } from "./firebase"

export * from "./firebase"

export const userCreate = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(auth, email, password)

export const userLogin = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password)

export const userLogout = async () => await signOut(auth)
