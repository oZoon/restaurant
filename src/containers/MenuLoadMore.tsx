import React from "react"

import { useMenu } from "@/store"
import { PaginationItem } from "@/ui"

export const MenuLoadMore: React.FC = () => {
  const { menu, loadPage } = useMenu((state) => state)

  return menu.length !== 0 ? <PaginationItem onLoadMore={loadPage} /> : null
}
