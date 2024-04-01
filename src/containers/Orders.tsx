import React from "react"
import styled from "styled-components"

import { ORDER_STATUS, WIDTH_768 } from "@/constants"
import { useOrders } from "@/store"
import { OrderItem } from "./OrderItem"

export const Orders: React.FC = () => {
  const orders = useOrders((state) =>
    state.orders.filter(
      (orderItem) => orderItem.status !== ORDER_STATUS.cancelled
    )
  )

  return (
    <ContentWrapper>
      {orders.map((orderItem, index) => (
        <OrderItem
          key={orderItem.id}
          isEven={index % 2 === 0}
          index={index}
          {...orderItem}
        />
      ))}
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
  box-sizing: border-box;

  @media (max-width: ${WIDTH_768 - 1}px) {
    align-items: center;
    gap: 20px;
  }
`
