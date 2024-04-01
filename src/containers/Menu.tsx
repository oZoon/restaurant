import React from "react"
import styled from "styled-components"

import { MenuItem } from "@/components"
import { WIDTH_DEFAULT } from "@/constants"
import { useBasket, useMenu } from "@/store"
import { MenuLoadMore } from "./MenuLoadMore"

export const Menu: React.FC = () => {
  const { menu } = useMenu((state) => state)
  const { insertProductToBasket } = useBasket((state) => state)
  const basketIds = useBasket((state) => state.basket.map((item) => item.id))

  if (menu.length === 0) {
    return null
  }

  return (
    <MenuWrapper>
      {menu.map((item) => (
        <MenuItem
          key={item.id}
          {...item}
          onInsertToBasket={() => insertProductToBasket(item)}
          isInBasket={basketIds.includes(item.id)}
        />
      ))}
      <MenuLoadMore />
    </MenuWrapper>
  )
}

const MenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 73px;
  width: ${WIDTH_DEFAULT}px;
  margin-bottom: 32px;
`
