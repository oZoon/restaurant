import { PaymentKeyType } from "@/constants"

export type ProductItemType = {
  id: number
  title: string
  price: number
  price_old: number
  description: string
  img: string
  volume: string
}

export type BasketItemType = ProductItemType & {
  count: number
  isSelected: boolean
}

type AddressType = string | undefined | null
export type PaymentType = PaymentKeyType | undefined | null

export type RequisiteType = {
  address: AddressType
  payment: PaymentType
}

export type OrderItemType = {
  id: string
  order: BasketItemType[]
  address: AddressType
  payment: PaymentType
  status: number
  isPayed: boolean
}
