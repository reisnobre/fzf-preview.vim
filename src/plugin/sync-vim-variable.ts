import { VimValue } from "neovim/lib/types/VimValue"
import { logger } from "neovim/lib/utils/logger"

import { vimVariableAssociation } from "@/association/vim-variable"
import { vimVariableModule } from "@/module/vim-variable"
import { pluginGetVar } from "@/plugin"
import { dispatch } from "@/store"
import type { VimVariableName } from "@/type"
import { objectKeys } from "@/util/object"

const getGlobalVariable = async (variableName: VimVariableName): Promise<VimValue | undefined> => {
  try {
    return await pluginGetVar(variableName)
  } catch (_error) {
    logger.warn(`g:${variableName} is not defined`)
    return new Promise((resolve) => {
      resolve(undefined)
    })
  }
}

export const syncVimVariable = async () => {
  const variableNames = objectKeys(vimVariableAssociation)
  const vimVariableActions = vimVariableModule.actions

  await Promise.all(
    variableNames.map(async (variableName) => {
      const value = await getGlobalVariable(vimVariableAssociation[variableName])
      if (value === undefined) {
        return
      }

      dispatch(
        vimVariableActions.setGlobalVariable({
          name: variableName,
          value
        })
      )
    })
  )
}
