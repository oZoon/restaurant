import i18next from "i18next"
import React from "react"
import styled from "styled-components"

import { WIDTH_576, WIDTH_768, WIDTH_992 } from "@/constants"
import { Orders } from "@/containers"
import { H14TitleCSS, H20TitleCSS } from "@/ui"

export const OrdersPage: React.FC = () => (
  <Container>
    <OrdersWrapper>
      <TitleWrapper>
        <Title>{i18next.t("ordersPage.title")}</Title>
      </TitleWrapper>
      <Orders />
    </OrdersWrapper>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin: 0 auto;
  width: ${WIDTH_992}px;

  @media (max-width: ${WIDTH_992 - 1}px) {
    width: ${WIDTH_768}px;
  }

  @media (max-width: ${WIDTH_768 - 1}px) {
    width: ${WIDTH_576}px;
  }

  @media (max-width: ${WIDTH_576 - 1}px) {
    width: 100%;
  }
`

const OrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    justify-content: center;
  }
`

const Title = styled.p`
  ${H20TitleCSS}
  padding: 5px 0;

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`
