import i18next from "i18next"
import React, { useCallback, useMemo } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

import { BasketItem } from "@/components"
import { WIDTH_576 } from "@/constants"
import { calcSum, isChecked } from "@/helpers"
import { allRoutes } from "@/routes"
import { useBasket, useOrders } from "@/store"
import { Button, Checkbox, H14TitleCSS, H20TitleCSS } from "@/ui"

export const Basket: React.FC = () => {
  const {
    basket,
    countSelected,
    updateItemInBasket,
    deleteItemFromBasket,
    deleteAllProducts,
    toggleSelectAllProducts,
    toggleSelectProduct,
  } = useBasket((state) => state)
  const { moveItemsToOrder } = useOrders((state) => state)
  const history = useHistory()

  const sum = useMemo(() => calcSum(basket), [basket])

  const checked = useMemo(
    () => isChecked(countSelected, basket.length),
    [basket.length, countSelected]
  )

  const handleMoveItemsToOrder = useCallback(async () => {
    await moveItemsToOrder().finally(() => history.push(allRoutes.orders.path))
  }, [history, moveItemsToOrder])

  return (
    <>
      {basket.length > 0 ? (
        <ContentWrapper>
          <ContentHeader>
            <CheckboxWrapper>
              <Checkbox
                onChange={toggleSelectAllProducts}
                label={i18next.t('basketPage.toggleSelected')}
                checked={checked}
              />
            </CheckboxWrapper>
            <ClearButtonWrapper>
              <Button onClick={deleteAllProducts}>{i18next.t('basketPage.clearBasket')}</Button>
            </ClearButtonWrapper>
          </ContentHeader>
          {basket.map((basketItem) => (
            <BasketItem
              key={basketItem.id}
              onIncreaseItemInBasket={() =>
                updateItemInBasket(basketItem, basketItem.count + 1)
              }
              onDecreaseItemInBasket={() =>
                basketItem.count - 1 > 0 &&
                updateItemInBasket(basketItem, basketItem.count - 1)
              }
              onDeleteItemFromBasket={() => deleteItemFromBasket(basketItem)}
              onToggleSelect={() => toggleSelectProduct(basketItem)}
              {...basketItem}
            />
          ))}
        </ContentWrapper>
      ) : (
        <EmptyBasket>{i18next.t('basketPage.emptyBasket')}</EmptyBasket>
      )}
      {basket.length > 0 && (
        <SumWrapper>
          <SumTitle>{i18next.t('basketPage.sumary')}</SumTitle>
          <Sum>{sum} {i18next.t("currencySymbol")}</Sum>
        </SumWrapper>
      )}
      {sum > 0 && (
        <ButtonWrapper>
          <Button onClick={handleMoveItemsToOrder}>
          {i18next.t('basketPage.moveToOrder')}
          </Button>
        </ButtonWrapper>
      )}
    </>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 12px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    gap: 30px;
  }
`

const SumWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 30px 0 30px;
`

const SumTitle = styled.p`
  ${H20TitleCSS}

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`

const Sum = styled.p`
  ${H20TitleCSS}
`

const EmptyBasket = styled.p`
  display: flex;
  justify-content: center;
  width: 100%;
  ${H20TitleCSS}
`

const ButtonWrapper = styled.div`
  margin: 20px;
  display: grid;
`

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`

const ClearButtonWrapper = styled.div`
  width: 205px;
`

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${WIDTH_576 - 1}px) {
    display: none;
  }
`
