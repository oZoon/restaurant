import React, { useCallback, useRef } from "react"
import styled from "styled-components"

import { colors } from "@/constants"
import { H12TitleCSS, H14TitleCSS } from "./typography"

type InputProps = {
  value: string
  onChange: (str: string) => void
  inputType: "password" | "text"
  placeholder?: string
  label?: string
  disabled?: boolean
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  inputType,
  label,
  ...props
}) => {
  const ref = useRef<HTMLInputElement | null>(null)

  // отключение автозаполнения
  const handleBlur = useCallback(() => {
    ref.current?.setAttribute("readonly", "true")
  }, [ref])

  // отключение автозаполнения
  const handleFocus = useCallback(() => {
    ref.current?.removeAttribute("readonly")
  }, [ref])

  return (
    <InputWrapper>
      {Boolean(label) && <Label>{label}</Label>}
      <InputField
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={inputType}
        autoComplete="off"
        onBlur={handleBlur}
        onFocus={handleFocus}
        readOnly
        {...props}
      />
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
  align-items: flex-start;
`

const Label = styled.label`
  ${H12TitleCSS}
`

const InputField = styled.input`
  width: 100%;
  padding: 6px 12px;
  border: 1px solid ${colors.mainText};
  ${H14TitleCSS}
  height: 28px;
  box-sizing: border-box;

  &:active,
  &:focus {
    border: 1px solid ${colors.grey.tone1};
    outline: none;
  }
`
