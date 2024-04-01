import { create } from "zustand"

import { menuLoadPage, ProductItemType } from "@/dal"
import { COUNT_PER_PAGE } from "@/constants"

type State = {
  menu: ProductItemType[]
  _page: number
}

type Action = {
  loadPage: () => void
}

export const useMenu = create<State & Action>((set, get) => ({
  menu: [] as ProductItemType[],
  _page: 0,

  loadPage: async () => {
    try {
      const { _page, menu } = get()
      let page = 0
      if (menu.length !== 0) {
        page = _page + 1
      }

      const data = await menuLoadPage(
        (COUNT_PER_PAGE * page).toString(),
        (COUNT_PER_PAGE * (page + 1) - 1).toString()
      )

      if (data !== null) {
        const menuArray: ProductItemType[] = []
        Object.keys(data).forEach((item) => menu.push(data[item]))
        set(({ menu }) => ({ menu: [...menu, ...menuArray], _page: page }))
      }
    } catch (error) {
      console.error(error)
    }
  },
}))
