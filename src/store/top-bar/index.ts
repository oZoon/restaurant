import { create } from "zustand"

type State = {
  active: number | null
}

type Action = {
  setActive: (actibe: State["active"]) => void
}

export const useTopBar = create<State & Action>((set) => ({
  active: null,

  setActive: (active) => set(() => ({ active })),
}))
