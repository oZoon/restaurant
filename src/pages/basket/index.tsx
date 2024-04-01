import i18next from "i18next"
import React from "react"
import styled from "styled-components"

import { WIDTH_576, WIDTH_768, WIDTH_992 } from "@/constants"
import { Basket } from "@/containers"
import { H14TitleCSS, H20TitleCSS } from "@/ui"

export const BasketPage: React.FC = () => {
  return (
    <Container>
      <BasketWrapper>
        <TitleWrapper>
          <Title>{i18next.t('basketPage.title')}</Title>
        </TitleWrapper>
        <Basket />
      </BasketWrapper>
    </Container>
  )
}

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

const BasketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 100%;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px 30px 30px;
`

const Title = styled.p`
  ${H20TitleCSS}
  padding: 5px 0;

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`
