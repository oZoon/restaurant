import i18next from "i18next"
import React, { useCallback, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import styled, { css } from "styled-components"

import { WIDTH_576, WIDTH_DEFAULT, colors, hexToDecimal } from "@/constants"
import { allRoutes, systemMenu } from "@/routes"
import { useTopBar, useUserData } from "@/store"
import { H14TitleCSS, H20TitleCSS } from "@/ui"

export const TopBar: React.FC = React.memo(function TopBar() {
  const { active, setActive } = useTopBar((state) => state)
  const { logout, uid } = useUserData((state) => state)
  const history = useHistory()

  useEffect(() => {
    const system = systemMenu.find(
      (systemItem) => systemItem.path === history.location.pathname
    )?.system
    if (active !== system) {
      setActive(system || 0)
    }
  }, [active, history.location.pathname, setActive])

  const handleLogout = useCallback(async () => {
    await logout().finally(() => history.push(allRoutes.home.path))
  }, [history, logout])

  if (active === null || uid === null) {
    return null
  }

  return (
    <Wrapper>
      <Container>
        <SubsystemWrapper>
          {systemMenu.map((item, index) => (
            <SubsystemItem
              to={item.path}
              key={index}
              active={active}
              index={index}
              onClick={() => setActive(index)}
            >
              {item.name}
            </SubsystemItem>
          ))}
          <Logout onClick={handleLogout}>{i18next.t("topBar.logout")}</Logout>
        </SubsystemWrapper>
      </Container>
    </Wrapper>
  )
})

const Wrapper = styled.header`
  width: 100%;
  padding: 12px 0;
  box-sizing: border-box;

  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: ${colors.white};
  box-shadow: rgba(${hexToDecimal(colors.realBlack).join(", ")}, 0.2) 0 2px 4px -1px,
    rgba(${hexToDecimal(colors.realBlack).join(", ")}, 0.14) 0 4px 5px 0,
    rgba(${hexToDecimal(colors.realBlack).join(", ")}, 0.12) 0 1px 10px 0;
`

const Container = styled.div`
  max-width: ${WIDTH_DEFAULT}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
  padding: 0 12px;
  box-sizing: border-box;
`

const SubsystemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`

type SubsystemItemProps = {
  active: number | null
  index: number
}

const SubsystemItem = styled(Link)<SubsystemItemProps>`
  ${H20TitleCSS}
  cursor: pointer;
  color: ${colors.mainText};

  ${({ active, index }) =>
    active === index &&
    css`
      border-bottom: 1px solid ${colors.mainText};
    `}

  &:hover {
    color: ${colors.grey.tone1};
  }

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`

const Logout = styled.div`
  ${H20TitleCSS}
  cursor: pointer;
  color: ${colors.mainText};

  &:hover {
    color: ${colors.grey.tone1};
  }

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H14TitleCSS}
  }
`
