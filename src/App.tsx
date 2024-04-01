import React from "react"
import { BrowserRouter } from "react-router-dom"

import './i18n/config'

import { DatabaseSubscribe } from "@/containers/DatabaseSubscribe"
import { UserSubscribe } from "@/containers/UserSubscribe"
import { SystemRoutes } from "@/routes"

import "../src/assets/fonts/Lato/lato.css"
import "../src/assets/styles/common.css"

export const App: React.FC = () => (
  <BrowserRouter>
    <UserSubscribe />
    <DatabaseSubscribe />
    <SystemRoutes />
  </BrowserRouter>
)
