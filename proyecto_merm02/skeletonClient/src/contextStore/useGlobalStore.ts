// globalStore.ts
import create from "zustand"

interface GlobalState {
  dataGlobalStore: string[] // Aquí usamos string[] como ejemplo, pero podría ser T[] para un tipo genérico
  setDataGlobalStore: (newData: string[]) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  dataGlobalStore: [],
  setDataGlobalStore: (newData) => set({ dataGlobalStore: newData })
}))

