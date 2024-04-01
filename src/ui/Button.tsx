import React from "react"
import styled, { css } from "styled-components"

import { colors } from "@/constants"
import { H14TitleCSS } from "./typography"

type Props = {
  onClick: () => void
  children?: string
  buttonType?: "button" | "submit" | "reset"
  disabled?: boolean
  icon?: string
}

export const Button: React.FC<Props> = ({
  onClick,
  children,
  buttonType = "button",
  disabled = false,
  icon = "",
}) => (
  <Wrapper
    onClick={onClick}
    type={buttonType}
    isIcon={icon !== ""}
    disabled={disabled}
  >
    {children}
    {icon && <img src={icon} />}
  </Wrapper>
)

type WrapperProps = {
  isIcon: boolean
}

const Wrapper = styled.button<WrapperProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s linear;
  background-color: ${colors.transparent};
  cursor: pointer;
  height: 28px;

  ${({ isIcon }) =>
    isIcon
      ? css`
          width: 28px;
          box-sizing: border-box;
          border: 0;
        `
      : css`
          ${H14TitleCSS}
          padding: 6px 12px;
          margin: 0;
          border: 1px solid ${colors.grey.tone1};
          color: ${colors.realBlack};

          &:disabled {
            border: 1px solid ${colors.red};
            cursor: not-allowed;
          }
        `}
`
