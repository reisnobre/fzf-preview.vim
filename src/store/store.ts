import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { vimVariableModule } from "@/module/vim-variable"
import { executeCommandModule } from "@/module/execute-command"

export type RootState = ReturnType<typeof store.getState>
export type Store = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch

const setupStore = () => {
  const store = configureStore({
    reducer: {
      vimVariable: vimVariableModule.reducer,
      executeCommand: executeCommandModule.reducer
    },
    middleware: getDefaultMiddleware()
  })

  return store
}

export const store = setupStore()
export const { dispatch } = store
