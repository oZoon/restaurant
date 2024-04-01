import React from "react"
import styled, { css } from "styled-components"

import arrowDownIcon from "@/assets/icons/arrow-down.svg"
import { colors } from "@/constants"
import { H12TitleCSS, H14TitleCSS } from "./typography"

type Props<T extends string> = {
  options: {
    [x in T]: string
  }
  placeholder: string
  selected: T | null
  onChange: (optionValue: T) => void
  label: string
  disabled?: boolean
}

export const Dropdown = <T extends string>({
  options,
  onChange,
  selected,
  placeholder = "Не выбрано",
  label,
  disabled,
}: Props<T>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement | null>(null)

  const handleToggleVisible = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isOpen) {
          setIsOpen(false)
        }
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  const handleClick = (item: T) => {
    onChange(item)
    handleToggleVisible()
  }

  return (
    <DropDownContainer ref={ref} disabled={disabled}>
      <Label>{label}</Label>
      <DropDownHeader onClick={handleToggleVisible} disabled={disabled}>
        <SelectedText>
          {selected !== null ? options[selected] : placeholder}
        </SelectedText>
        <Icons>
          {Object.keys(options).length > 0 && <img src={arrowDownIcon} />}
        </Icons>
      </DropDownHeader>
      {isOpen && (
        <DropDownList>
          {Object.keys(options).map((key) => (
            <ListItem
              key={key}
              active={key === selected}
              onClick={() => handleClick(key as T)}
            >
              <ItemWrapper>{options[key]}</ItemWrapper>
            </ListItem>
          ))}
        </DropDownList>
      )}
    </DropDownContainer>
  )
}

type DropDownContainerProps = {
  disabled?: boolean
}

const DropDownContainer = styled.div<DropDownContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
  align-items: flex-start;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`

const Label = styled.label`
  ${H12TitleCSS}
`

const DropDownHeader = styled.div<{ disabled?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;

  border: 1px solid ${colors.realBlack};
  cursor: pointer;
  user-select: none;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`

const SelectedText = styled.div`
  ${H14TitleCSS}
  padding: 6px 12px;
`

const DropDownList = styled.ul`
  width: 100%;
  position: absolute;
  top: 43px;
  box-sizing: border-box;
  animation: fadeout 0.5s;
  border: 1px solid ${colors.realBlack};
  background-color: ${colors.white};
`

type ListItemProps = {
  active?: boolean
}

const ListItem = styled.li<ListItemProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  font-size: 14px;
  line-height: 18px;
  padding: 0 8px;
  min-height: 43px;
  animation: fadeout 0.5s;
  user-select: none;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      color: ${colors.mainText};
    `}

  &:hover {
    background-color: ${colors.grey.tone3};
  }

  &:last-child {
    border-bottom: none;
  }
`

const Icons = styled.div`
  display: flex;
  align-items: center;
`

const ItemWrapper = styled.div`
  ${H14TitleCSS}
`
