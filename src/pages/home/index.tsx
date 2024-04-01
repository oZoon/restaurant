import i18next from "i18next"
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { WIDTH_576, colors } from "@/constants"
import { allRoutes } from "@/routes"
import { H12TitleCSS, H20TitleCSS } from "@/ui"

export const Home: React.FC = () => (
  <Container>
    <AuthLink to={allRoutes.registration.path}>
      {i18next.t("homePage.registration")}
    </AuthLink>
    <AuthLink to={allRoutes.login.path}>{i18next.t("homePage.login")}</AuthLink>
  </Container>
)

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  gap: 30px;
`

const AuthLink = styled(Link)`
  ${H20TitleCSS}
  cursor: pointer;

  &:hover {
    color: ${colors.grey.tone1};
  }

  @media (max-width: ${WIDTH_576 - 1}px) {
    ${H12TitleCSS}
  }
`
