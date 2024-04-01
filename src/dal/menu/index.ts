import { endAt, get, orderByKey, query, ref, startAt } from "firebase/database"

import { db } from "../firebase"
import { ProductItemType } from "../types"
import { DB_FIELDS } from "@/constants"

export const menuLoadPage = async (start: string, end: string) =>
  await get(
    query(ref(db, DB_FIELDS.MENU), orderByKey(), startAt(start), endAt(end))
  )
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val() as { [x: string]: ProductItemType }
      }
      return null
    })
    .catch((error) => {
      console.error(error)
      return null
    })
