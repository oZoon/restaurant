import React, { ReactNode } from "react"
import styled from "styled-components"

import { TopBar } from "@/containers"

type Props = {
  children: ReactNode
}

export const LayoutPage: React.FC<Props> = ({ children }) => (
  <Container>
    <TopBar />
    {children}
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
