import { onAuthStateChanged } from "firebase/auth"
import React, { useEffect } from "react"

import { auth } from "@/dal"
import { useUserData } from "@/store"

export const UserSubscribe: React.FC = () => {
  const { updateUid } = useUserData((state) => state)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUid(user.uid)
      }
    })
  }, [updateUid])

  return null
}
