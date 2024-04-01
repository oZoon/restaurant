import i18next from "i18next"

export const PAYMENT = {
  cashToCourier: i18next.t("ordersPage.paymentMethod.cashToCourier"),
  bankTransferToCourier: i18next.t(
    "ordersPage.paymentMethod.bankTransferToCourier"
  ),
  bankTransferToSite: i18next.t("ordersPage.paymentMethod.bankTransferToSite"),
}

export type PaymentKeyType = keyof typeof PAYMENT
