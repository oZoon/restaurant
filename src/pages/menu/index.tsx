import React from "react"
import styled from "styled-components"

import { Menu } from "@/containers"
import { useMenu } from "@/store"

useMenu.getState().loadPage()

export const MenuPage: React.FC = () => (
  <Container>
    <Menu />
  </Container>
)

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100vh;
  gap: 30px;
`
