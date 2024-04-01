import { allRoutes } from "./const"

type SystemBase = {
  system: number | null
}

export type SystemItem = SystemBase & {
  name: string
  path: string
}

export type SystemProps = SystemBase & {
  children: JSX.Element
}

export type SystemName = keyof typeof allRoutes

export type SystemRoute = {
  [name in SystemName]: SystemItem & {
    component: React.FC
  }
}
