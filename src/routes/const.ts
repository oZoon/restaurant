import i18next from "i18next"

import {
  AuthorizationPage,
  BasketPage,
  Home,
  MenuPage,
  OrdersPage,
  RegistrationPage,
} from "@/pages"
import { SystemItem } from "./types"

export const allRoutes = {
  home: {
    name: i18next.t("routeName.homePage"),
    path: "/",
    component: Home,
    system: null,
  },
  login: {
    name: i18next.t("routeName.loginPage"),
    path: "/login",
    component: AuthorizationPage,
    system: null,
  },
  registration: {
    name: i18next.t("routeName.registrationPage"),
    path: "/register",
    component: RegistrationPage,
    system: null,
  },
  menu: {
    name: i18next.t("routeName.menuPage"),
    path: "/menu",
    component: MenuPage,
    system: 0,
  },
  basket: {
    name: i18next.t("routeName.basketPage"),
    path: "/basket",
    component: BasketPage,
    system: 1,
  },
  orders: {
    name: i18next.t("routeName.ordersPage"),
    path: "/orders",
    component: OrdersPage,
    system: 2,
  },
}

export const systemMenu = Object.keys(allRoutes)
  .map((item) => {
    const { system, name, path } = allRoutes[item] as SystemItem

    return {
      system,
      name,
      path,
    }
  })
  .filter((item) => item.system !== null)
