import { create } from "zustand"

import { DB_FIELDS, ORDER_STATUS, PAYMENT, PaymentKeyType } from "@/constants"
import { OrderItemType, RequisiteType, setNode } from "@/dal"
import { jenkinsOneAtATimeHash } from "@/helpers"
import { useBasket, useUserData } from "@/store"

type State = {
  orders: OrderItemType[]
  requisites: RequisiteType[]
}

type Action = {
  setOrders: (orders: OrderItemType[]) => void
  moveItemsToOrder: () => Promise<boolean>

  updateAddress: (addres: string, orderIndex: number) => void
  updatePayment: (payment: PaymentKeyType, orderIndex: number) => void

  registerOrder: (orderIndex: number) => Promise<boolean>
  payOrder: (orderIndex: number) => Promise<boolean>
  cancelOrder: (orderIndex: number) => Promise<boolean>
}

export const useOrders = create<State & Action>((set, get) => ({
  orders: [] as OrderItemType[],
  requisites: [] as RequisiteType[],

  setOrders: (orders) => {
    const requisites = orders.map((orderItem) => ({
      address: orderItem.address,
      payment: orderItem.payment,
    }))
    set(() => ({ orders, requisites }))
  },

  moveItemsToOrder: async () => {
    try {
      const { basket, deleteSelectedProducts } = useBasket.getState()
      const uid = useUserData.getState().uid
      const { orders } = get()

      if (uid !== null) {
        const key = jenkinsOneAtATimeHash(uid)
        const order = {
          id: `${key}-${orders.length + 1}`,
          order: basket,
          address: null,
          payment: null,
          status: ORDER_STATUS.movedToOrder,
          isPayed: false,
        }

        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.ORDERS}/${order.id}`,
          order
        )
          .then(() => {
            deleteSelectedProducts()
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
      return false
    }
  },

  updateAddress: (addressString, orderIndex) => {
    const { requisites } = get()
    requisites[orderIndex].address = addressString
    set(() => ({ requisites }))
  },

  updatePayment: (payment, orderIndex) => {
    const { requisites } = get()
    requisites[orderIndex].payment = payment
    set(() => ({ requisites }))
  },

  registerOrder: async (orderIndex) => {
    try {
      const orderItem = get().orders[orderIndex]
      const requisite = get().requisites[orderIndex]
      const uid = useUserData.getState().uid
      if (uid !== null) {
        const order = {
          ...orderItem,
          ...requisite,
          status:
            PAYMENT[requisite.payment as PaymentKeyType] ===
            PAYMENT.bankTransferToSite
              ? ORDER_STATUS.registered
              : ORDER_STATUS.movedToAssembly,
        }

        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.ORDERS}/${order.id}`,
          order
        )
          .then(() => true)
          .catch((error) => {
            console.error(error)
            return false
          })
      }

      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },

  cancelOrder: async (orderIndex) => {
    try {
      const orderItem = get().orders[orderIndex]
      const uid = useUserData.getState().uid
      if (uid !== null) {
        const order = {
          ...orderItem,
          status: ORDER_STATUS.cancelled,
        }
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.ORDERS}/${order.id}`,
          order
        )
          .then(() => true)
          .catch((error) => {
            console.error(error)
            return false
          })
      }

      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },

  payOrder: async (orderIndex) => {
    try {
      const orderItem = get().orders[orderIndex]
      const uid = useUserData.getState().uid
      if (uid !== null) {
        const order = {
          ...orderItem,
          status: ORDER_STATUS.movedToAssembly,
          isPayed: true,
        }
        return await setNode(
          `${DB_FIELDS.USERS}/${uid}/${DB_FIELDS.ORDERS}/${order.id}`,
          order
        )
          .then(() => true)
          .catch((error) => {
            console.error(error)
            return false
          })
      }

      return false
    } catch (message) {
      console.error(message)
      return false
    }
  },
}))
