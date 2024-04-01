import { onValue, ref } from "firebase/database"
import React, { useEffect } from "react"

import { DB_FIELDS } from "@/constants"
import { BasketItemType, OrderItemType, db } from "@/dal"
import { useBasket, useOrders, useUserData } from "@/store"

export const DatabaseSubscribe: React.FC = () => {
  const { uid } = useUserData((state) => state)
  const { setBasket, setSelected } = useBasket((state) => state)
  const { setOrders } = useOrders((state) => state)

  useEffect(() => {
    if (uid !== null) {
      const userRef = ref(db, `${DB_FIELDS.USERS}/${uid}`)

      onValue(userRef, (snapshot) => {
        const snap = snapshot.val()
        const keys =
          snap !== undefined && snap !== null ? Object.keys(snap) : []

        if (keys.includes(DB_FIELDS.BASKET)) {
          const basket = snap[DB_FIELDS.BASKET]
          const basketKeys =
            basket !== undefined && basket !== null ? Object.keys(basket) : []
          const data: BasketItemType[] = []
          let countSelected = 0
          basketKeys.forEach((item) => {
            data.push({
              ...basket[item],
            })
            if (basket[item].isSelected) {
              countSelected += 1
            }
          })
          setBasket(data)
          setSelected(countSelected)
        } else {
          setBasket([])
          setSelected(0)
        }

        if (keys.includes(DB_FIELDS.ORDERS)) {
          const orders = snap[DB_FIELDS.ORDERS]
          const ordersKeys =
            orders !== undefined && orders !== null ? Object.keys(orders) : []
          const data: OrderItemType[] = []
          ordersKeys.forEach((item) =>
            data.push({
              ...orders[item],
            })
          )
          setOrders(data)
        } else {
          setOrders([])
        }
      })
    }
  }, [setBasket, setOrders, setSelected, uid])

  return null
}
