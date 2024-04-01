import i18next from "i18next"
import React from "react"
import styled, { css } from "styled-components"

import { WIDTH_576, colors } from "@/constants"
import { BasketItemType } from "@/dal"
import { Button, Checkbox, H12TitleCSS, H14TitleCSS, H20TitleCSS } from "@/ui"

type BasketItemProps = {
  onIncreaseItemInBasket: () => void
  onDecreaseItemInBasket: () => void
  onDeleteItemFromBasket: () => void
  onToggleSelect: () => void
}

export const BasketItem: React.FC<BasketItemProps & BasketItemType> = ({
  onIncreaseItemInBasket,
  onDecreaseItemInBasket,
  onDeleteItemFromBasket,
  onToggleSelect,
  img,
  count,
  title,
  price,
  price_old,
  isSelected,
}) => (
  <Container>
    <WideCheckboxWrapper>
      <Checkbox
        onChange={onToggleSelect}
        checked={Number(isSelected) as 0 | 1}
      />
    </WideCheckboxWrapper>
    <TitleWrapper>
      <ImageWrapper
        src={`http://restaurant.zonajs.ru/img/${img}.jpg`}
        loading="lazy"
      />
      <Title>{title}</Title>
    </TitleWrapper>

    <TextWrapper>
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
    </TextWrapper>

    <CountWrapper>
      <ButtonWrapper>
        <SlimCheckboxWrapper>
          <Checkbox
            onChange={onToggleSelect}
            checked={Number(isSelected) as 0 | 1}
          />
        </SlimCheckboxWrapper>
        <Button onClick={onDecreaseItemInBasket}>-1</Button>
        <Count>{count}</Count>
        <Button onClick={onIncreaseItemInBasket}>+1</Button>
      </ButtonWrapper>
      <Button onClick={onDeleteItemFromBasket}>
        {i18next.t("basketPage.deleteItem")}
      </Button>
    </CountWrapper>
  </Container>
)

const WideCheckboxWrapper = styled.div`
  display: block;

  @media (max-width: ${WIDTH_576 - 1}px) {
    display: none;
  }
`

const SlimCheckboxWrapper = styled.div`
  display: none;

  @media (max-width: ${WIDTH_576 - 1}px) {
    display: block;
    margin-right: 12px;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 120px;
  gap: 12px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 4px;
  }
`

const ImageWrapper = styled.img`
  width: 120px;
  height: 120px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    height: 296px;
    width: 296px;
  }
`

const TextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: ${WIDTH_576 - 1}px) {
    flex-direction: column;
    height: 100%;
  }
`

const Title = styled.p`
  ${H20TitleCSS}
  padding: 12px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
    padding: 4px;
  }
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

type PriceProps = {
  hasOld: boolean
}

const Price = styled.label<PriceProps>`
  ${H20TitleCSS}
  white-space: nowrap;

  ${({ hasOld }) =>
    hasOld &&
    css`
      color: ${colors.red};
    `}
`

const PriceOld = styled.label`
  ${H12TitleCSS}
  white-space: nowrap;

  text-decoration: line-through;
  color: ${colors.grey.tone1};
`

const CountWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`

const Count = styled.p`
  ${H14TitleCSS}
  color: ${colors.red};
  margin: 0 8px;
`
