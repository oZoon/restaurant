import React, { useMemo, useState } from "react"
import styled, { css } from "styled-components"

import {
  PAYMENT,
  PaymentKeyType,
  WARNING,
  WIDTH_576,
  WIDTH_768,
  colors,
} from "@/constants"
import { OrderItemType } from "@/dal"
import { Button, Dropdown, H14TitleCSS, H20TitleCSS, Input } from "@/ui"

import { useOrders } from "@/store"
import { checkWarning, getMessage } from "@/helpers"
import deleteIcon from "@/assets/icons/delete.svg"
import i18next from "i18next"

type OrderItemProps = {
  isEven: boolean
  index: number
}

export const OrderItem: React.FC<OrderItemProps & OrderItemType> = ({
  isEven,
  index,
  id,
  order,
  status,
  isPayed,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const requisite = useOrders((state) => state.requisites[index])

  const { updateAddress, updatePayment, registerOrder, payOrder, cancelOrder } =
    useOrders((state) => state)
  const warning = useMemo(
    () => checkWarning(status, requisite.payment, isPayed),
    [isPayed, requisite.payment, status]
  )
  const sum = useMemo(
    () => order.reduce((total, item) => total + item.count * item.price, 0),
    [order]
  )
  const message = useMemo(() => getMessage(status), [status])

  return (
    <Wrapper isVisible={isVisible}>
      <HeaderWrapper isEven={isEven}>
        <HeaderLine justifyContent="flex-start">
          <Button onClick={() => cancelOrder(index)} icon={deleteIcon} />
          <ButtonWrapper>
            <Button onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? "-" : "+"}
            </Button>
          </ButtonWrapper>

          <Header>
            <Text>{i18next.t("ordersPage.headerTitle")}</Text>
            {`№ ${id}, `}
            <Text>{i18next.t("ordersPage.headerSum")}</Text>
            {sum} {i18next.t("currencySymbol")}
          </Header>
        </HeaderLine>
        {(message !== null || warning === WARNING.paymentNotPerform) && (
          <HeaderLine justifyContent="flex-start">
            {message !== null && <Information>{message}</Information>}
            {warning === WARNING.paymentNotPerform && (
              <PaymentButtonWrapper>
                <Button onClick={() => payOrder(index)}>
                  {i18next.t("ordersPage.getPay")}
                </Button>
              </PaymentButtonWrapper>
            )}
          </HeaderLine>
        )}
      </HeaderWrapper>
      {isVisible && (
        <VisibleWrapper>
          <ContentWrapper>
            {order.map((orderItem) => (
              <Container key={orderItem.id}>
                <TitleWrapper>
                  <ImageWrapper
                    src={`http://restaurant.zonajs.ru/img/${orderItem.img}.jpg`}
                    loading="lazy"
                  />
                  <Title>{orderItem.title}</Title>
                </TitleWrapper>
                <Price>{`${orderItem.count}${i18next.t(
                  "ordersPage.measure"
                )}, ${i18next.t("ordersPage.byOnePiece")} ${
                  orderItem.price
                } ${i18next.t("currencySymbol")}`}</Price>
              </Container>
            ))}
          </ContentWrapper>
          {status === 0 && (
            <RequisiteWrapper>
              <DropdownWrapper>
                <Dropdown
                  label={i18next.t("ordersPage.selectPaymentMethodTitle")}
                  options={PAYMENT}
                  placeholder={i18next.t(
                    "ordersPage.selectPaymentMethodPlaceholder"
                  )}
                  selected={requisite.payment || null}
                  onChange={(paymentMethod) =>
                    updatePayment(paymentMethod, index)
                  }
                />
              </DropdownWrapper>
              <InputWrapper>
                <Input
                  label={i18next.t("ordersPage.deliveryPointTitle")}
                  placeholder={i18next.t("ordersPage.deliveryPointPlaceholder")}
                  value={requisite.address || ""}
                  onChange={(address) => updateAddress(address, index)}
                  inputType="text"
                />
              </InputWrapper>
              <OkButtonWrapper>
                <Button
                  onClick={() => registerOrder(index)}
                  disabled={
                    !(Boolean(requisite.payment) && Boolean(requisite.address))
                  }
                >
                  {i18next.t("ordersPage.registerOrder")}
                </Button>
              </OkButtonWrapper>
            </RequisiteWrapper>
          )}
          {status !== 0 && (
            <RequisiteWrapper>
              <RequisiteText>
                {i18next.t("ordersPage.selectPaymentMethodTitle")}:{" "}
                {PAYMENT[requisite.payment as PaymentKeyType]},{" "}
                {i18next.t("ordersPage.deliveryPointTitle")}:{" "}
                {requisite.address}
              </RequisiteText>
            </RequisiteWrapper>
          )}
        </VisibleWrapper>
      )}
    </Wrapper>
  )
}

const DROPDOWN_WIDTH = 220
const REGISTER_BUTTON_WIDTH = 140
const GAP_REQUISITE_WRAPPER = 12

type WrapperProps = {
  isVisible: boolean
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;

  ${({ isVisible }) =>
    isVisible
      ? css`
          flex-direction: column;
          align-items: flex-start;
        `
      : css`
          flex-direction: row;
          align-items: center;
        `}

  @media (max-width: ${WIDTH_576 - 1}px) {
    align-items: center;
    justify-content: center;
    width: 320px;
  }
`

type HeaderWrapperProps = {
  isEven: boolean
}

const HeaderWrapper = styled.div<HeaderWrapperProps>`
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  background-color: ${({ isEven }) =>
    isEven ? colors.grey.tone4 : colors.grey.tone3};

  @media (max-width: ${WIDTH_768 - 1}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    height: unset;
    padding: 12px 0;
  }

  @media (max-width: ${WIDTH_576 - 1}px) {
    width: 296px;
  }
`

type HeaderLineProps = {
  justifyContent: string
}

const HeaderLine = styled.div<HeaderLineProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  height: 28px;
`

const ButtonWrapper = styled.div`
  width: 30px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${H20TitleCSS}

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`

const Text = styled.span`
  display: block;
  margin-right: 8px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    display: none;
  }
`

const PaymentButtonWrapper = styled.div`
  width: 90px;
`

const Information = styled.div`
  ${H20TitleCSS}

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`

const VisibleWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 30px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    align-items: center;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
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
    box-sizing: border-box;
    gap: 4px;
  }
`

const TitleWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    flex-direction: column;
    height: 100%;
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

const Title = styled.p`
  ${H20TitleCSS}

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`

const Price = styled.span`
  ${H20TitleCSS}
  white-space: nowrap;

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`

const DropdownWrapper = styled.div`
  width: ${DROPDOWN_WIDTH}px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    width: 296px;
  }
`

const InputWrapper = styled.div`
  width: calc(
    100% - ${DROPDOWN_WIDTH}px - ${REGISTER_BUTTON_WIDTH}px -
      ${GAP_REQUISITE_WRAPPER * 2}px
  );

  @media (max-width: ${WIDTH_576 - 1}px) {
    width: 296px;
  }
`

const RequisiteWrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  align-items: flex-end;
  gap: ${GAP_REQUISITE_WRAPPER}px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 296px;
    gap: 4px;
  }
`

const OkButtonWrapper = styled.div`
  width: ${REGISTER_BUTTON_WIDTH}px;

  @media (max-width: ${WIDTH_576 - 1}px) {
    width: 296px;
  }
`

const RequisiteText = styled.div`
  ${H14TitleCSS}
`
