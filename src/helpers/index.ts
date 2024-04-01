import { PAYMENT, WARNING } from "@/constants"
import { BasketItemType, PaymentType } from "@/dal"
import i18next from "i18next"

export function jenkinsOneAtATimeHash(keyString: string) {
  let hash = 0
  for (let charIndex = 0; charIndex < keyString.length; ++charIndex) {
    hash += keyString.charCodeAt(charIndex)
    hash += hash << 10
    hash ^= hash >> 6
  }
  hash += hash << 3
  hash ^= hash >> 11
  //4,294,967,295 is FFFFFFFF, the maximum 32 bit unsigned integer value, used here as a mask.
  return ((hash + (hash << 15)) & 42949672) >>> 0
}

export const checkWarning = (
  status: number,
  payment: PaymentType,
  isPayed: boolean
) => {
  switch (status) {
    case 0:
      return WARNING.emptyFields
    case 1:
      return payment !== null &&
        payment !== undefined &&
        PAYMENT[payment] === PAYMENT.bankTransferToSite &&
        !isPayed
        ? WARNING.paymentNotPerform
        : null
    default:
      return null
  }
}

export const getMessage = (status: number) => {
  switch (status) {
    case 1:
      return i18next.t("ordersPage.status.waitPayment")
    case 2:
      return i18next.t("ordersPage.status.payed")
    case 3:
      return i18next.t("ordersPage.status.movedToAssembly")
    case 4:
      return i18next.t("ordersPage.status.movedToDeliveryService")
    case 5:
      return i18next.t("ordersPage.status.readyToPickup")
    case 6:
      return i18next.t("ordersPage.status.pickedUp")
    case 7:
      return i18next.t("ordersPage.status.cancelled")
    default:
      return null
  }
}

export const calcSum = (basket: BasketItemType[]) =>
  basket
    .filter((item) => item.isSelected)
    .reduce((total, item) => total + item.count * item.price, 0)

export const isChecked = (
  countSelected: number,
  length: number
) => {
  if (countSelected === 0) {
    return 0
  }
  if (length !== 0) {
    if (countSelected === length) {
      return 1
    }
    if (countSelected !== length) {
      return 2
    }
  }
  return 0
}
