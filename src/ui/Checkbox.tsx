import React from "react"
import styled, { css } from "styled-components"

import checkedFullIcon from "@/assets/icons/checkbox-checked-full.svg"
import checkedSemiIcon from "@/assets/icons/checkbox-checked-semi.svg"
import { colors } from "@/constants"
import { CheckboxValueType } from "./types"
import { H14TitleCSS } from "./typography"

type CheckboxProps = {
  // 0 - выключено
  // 1 - включено
  // 2 - частично включено
  checked: CheckboxValueType
  onChange: (value: boolean) => void
  label?: string
  disabled?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  onChange,
  checked,
  disabled = false,
}) => (
  <Wrapper
    isDisabled={disabled}
    onClick={() =>
      !disabled && onChange(checked === 0 || checked === 2 ? true : false)
    }
  >
    <InputWrapper checked={checked}>
      {[1, 2].includes(checked) && (
        <Image src={checked === 1 ? checkedFullIcon : checkedSemiIcon} />
      )}
    </InputWrapper>
    {label && <Text>{label}</Text>}
  </Wrapper>
)

type WrapperProps = {
  isDisabled?: boolean
}

const Wrapper = styled.label<WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  color: inherit;
  cursor: pointer;
  gap: 8px;

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`

type InputWrapperProps = {
  checked: 0 | 1 | 2
}

const InputWrapper = styled.div<InputWrapperProps>`
  height: 14px;
  width: 14px;
  border: solid 1px
    ${({ checked }) => (checked === 0 ? colors.grey.tone1 : colors.mainText)};
  border-radius: 0;
  position: relative;
`

const Text = styled.span`
  ${H14TitleCSS}
`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`
