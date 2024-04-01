import React from "react"
import { Route, Switch } from "react-router-dom"
import styled from "styled-components"

import { LayoutPage } from "@/components"
import { colors } from "@/constants"
import { allRoutes } from "./const"

export const SystemRoutes: React.FC = () => (
  <Container>
    <Switch>
      {Object.keys(allRoutes)
        .filter((route) => allRoutes[route].system === null)
        .map((route) => {
          const { component: Component, path } = allRoutes[route]

          return (
            <Route key={path} path={path} exact>
              <Component />
            </Route>
          )
        })}
      {Object.keys(allRoutes)
        .filter((route) => allRoutes[route].system !== null)
        .map((route) => {
          const { component: Component, path } = allRoutes[route]

          return (
            <Route key={path} path={path} exact>
              <LayoutPage>
                <Component />
              </LayoutPage>
            </Route>
          )
        })}
    </Switch>
  </Container>
)

const Container = styled.div`
  background-color: ${colors.white};
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`
