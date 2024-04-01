import { create } from "zustand"

import { DB_FIELDS } from "@/constants"
import { BasketItemType, ProductItemType, setNode } from "@/dal"
import { useUserData } from "@/store"

type State = {
  basket: BasketItemType[]
  countSelected: number
}

type Action = {
  setBasket: (basket: BasketItemType[]) => void
  setSelected: (isSelectAll: number) => void
  insertProductToBasket: (productItem: ProductItemType) => Promise<boolean>
  deleteItemFromBasket: (basketItem: BasketItemType) => Promise<boolean>
  updateItemInBasket: (
    basketItem: BasketItemType,
    count: number
  ) => Promise<boolean>
  deleteAllProducts: () => Promise<boolean>
  deleteSelectedProducts: () => Promise<boolean>
  toggleSelectAllProducts: (toggle: boolean) => Promise<boolean>
  toggleSelectProduct: (basketItem: BasketItemType) => Promise<boolean>
}

export const useBasket = create<State & Action>((set, get) => ({
  basket: [] as BasketItemType[],
  countSelected: 0,

  setBasket: (basket) => set(() => ({ basket })),
  setSelected: (countSelected) => set(() => ({ countSelected })),

  insertProductToBasket: async (productItem) => {
    try {
      const uid = useUserData.getState().uid
      if (uid !== null) {
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.BASKET}/${productItem.id}`,
          {
            ...productItem,
            count: 1,
            isSelected: true,
          }
        ).then(() => true)
      }
      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },

  deleteItemFromBasket: async (basketItem) => {
    try {
      const uid = useUserData.getState().uid
      if (uid !== null) {
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.BASKET}/${basketItem.id}`,
          {}
        ).then(() => true)
      }
      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },

  updateItemInBasket: async (basketItem, count) => {
    try {
      const uid = useUserData.getState().uid
      if (uid !== null) {
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.BASKET}/${basketItem.id}`,
          {
            ...basketItem,
            count,
          }
        ).then(() => true)
      }
      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },

  deleteAllProducts: async () => {
    try {
      const uid = useUserData.getState().uid
      if (uid !== null) {
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.BASKET}`,
          {}
        ).then(() => true)
      }
      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },

  deleteSelectedProducts: async () => {
    try {
      const uid = useUserData.getState().uid
      const basket = get().basket.filter((basketItem) => !basketItem.isSelected)
      const basketObject = {}
      basket.forEach((_, index) => {
        basketObject[basket[index].id] = basket[index]
      })
      if (uid !== null) {
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.BASKET}`,
          basketObject
        ).then(() => true)
      }
      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },

  toggleSelectAllProducts: async (toggle) => {
    try {
      const uid = useUserData.getState().uid
      const { basket } = get()
      const basketObject = {}
      basket.forEach((_, index) => {
        basket[index].isSelected = toggle
        basketObject[basket[index].id] = basket[index]
      })
      if (uid !== null) {
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.BASKET}`,
          basketObject
        ).then(() => true)
      }
      return true
    } catch (message) {
      console.error(message)
      return false
    }
  },

  toggleSelectProduct: async (basketItem) => {
    try {
      const uid = useUserData.getState().uid
      if (uid !== null) {
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.BASKET}/${basketItem.id}`,
          {
            ...basketItem,
            isSelected: !basketItem.isSelected,
          }
        ).then(() => true)
      }
      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },
}))
