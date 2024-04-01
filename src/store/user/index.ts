import { create } from "zustand"

import { userCreate, userLogout, userLogin } from "@/dal"

type State = {
  email: string | null
  password: string | null
  uid: string | null
  message: string | null
}

type Action = {
  updateEmail: (email: State["email"]) => void
  updatePassword: (password: State["password"]) => void
  updateUid: (uid: State["uid"]) => void
  submitRegistration: () => Promise<boolean>
  submitAuthorization: () => Promise<boolean>
  logout: () => Promise<boolean>
}

type ErrorResponse = {
  message: string
}

export const useUserData = create<State & Action>((set, get) => ({
  email: null,
  password: null,
  uid: null,
  message: null,

  updateEmail: (email) =>
    set(({ message }) => {
      if (message !== null) {
        return { email, message: null }
      }
      return { email }
    }),

  updatePassword: (password) =>
    set(({ message }) => {
      if (message !== null) {
        return { password, message: null }
      }
      return { password }
    }),

  updateUid: (uid) => set(() => ({ uid })),

  submitRegistration: async () => {
    try {
      const { email, password } = get()
      if (email !== null && password !== null) {
        return await userCreate(email, password)
          .then((res) => {
            const { uid } = res.user
            set(() => ({ uid, password: null, email: null }))
            return true
          })
          .catch((error) => {
            console.error(error)
            return false
          })
      }
      return false
    } catch (message) {
      console.error(message)
      set(() => ({
        message: (message as ErrorResponse).message,
        email: null,
        password: null,
        uid: null,
      }))
      return false
    }
  },

  submitAuthorization: async () => {
    try {
      const { email, password } = get()
      if (email !== null && password !== null) {
        return await userLogin(email, password)
          .then((res) => {
            const { uid } = res.user
            set(() => ({ uid, password: null, email: null }))
            return true
          })
          .catch((error) => {
            console.error(error)
            return false
          })
      }
      return false
    } catch (message) {
      console.error(message)
      set(() => ({
        message: (message as ErrorResponse).message,
        email: null,
        password: null,
        uid: null,
      }))
      return false
    }
  },

  logout: async () => {
    try {
      set(() => ({ uid: null }))
      return await userLogout()
        .then((succesBoolean) => succesBoolean)
        .catch((errorBoolean) => errorBoolean)
    } catch (message) {
      console.error(message)
      return false
    }
  },
}))
