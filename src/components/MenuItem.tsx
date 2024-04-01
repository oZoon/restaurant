import React from "react"
import styled, { css } from "styled-components"

import { colors } from "@/constants"
import { ProductItemType } from "@/dal"
import { Button, H12TitleCSS, H14TitleCSS, H20TitleCSS } from "@/ui"
import i18next from "i18next"

type MenuItemProps = {
  onInsertToBasket: () => void
  isInBasket: boolean
}

export const MenuItem: React.FC<ProductItemType & MenuItemProps> = ({
  img,
  title,
  price,
  volume,
  price_old,
  isInBasket,
  description,
  onInsertToBasket,
}) => (
  <Container>
    <img
      src={`http://restaurant.zonajs.ru/img/${img}.jpg`}
      loading="lazy"
      width="295px"
      height="295px"
    />
    <TextWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
        <Description>
          {description.length === 0 ? volume : [description, volume].join(", ")}
        </Description>
      </TitleWrapper>

      <BottomDataWrapper>
        <PriceWrapper>
          <Price hasOld={price_old !== 0}>
            {price} {i18next.t("currencySymbol")}
          </Price>
          {price_old !== 0 && (
            <PriceOld>
              {price_old} {i18next.t("currencySymbol")}
            </PriceOld>
          )}
        </PriceWrapper>
        {isInBasket ? (
          <InBasket>{i18next.t("menuPage.inBasket")}</InBasket>
        ) : (
          <ButtonWrapper>
            <Button onClick={onInsertToBasket}>
              {i18next.t("menuPage.toBasket")}
            </Button>
          </ButtonWrapper>
        )}
      </BottomDataWrapper>
    </TextWrapper>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 295px;
  height: 460px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border: 1px solid ${colors.grey.tone1};
`

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Title = styled.p`
  ${H20TitleCSS}
  padding: 0 12px;
  margin-top: 12px;
`

const Description = styled.p`
  ${H14TitleCSS}
  padding: 0 12px;
`

const BottomDataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 30px 12px;
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

type PriceProps = {
  hasOld: boolean
}

const Price = styled.p<PriceProps>`
  ${H20TitleCSS}

  ${({ hasOld }) =>
    hasOld &&
    css`
      color: ${colors.red};
    `}
`

const PriceOld = styled.p`
  ${H12TitleCSS}

  text-decoration: line-through;
  color: ${colors.grey.tone1};
`

const InBasket = styled.p`
  ${H14TitleCSS}
  color: ${colors.red};
  padding: 7px 0;
`

const ButtonWrapper = styled.div`
  width: 100px;
`
