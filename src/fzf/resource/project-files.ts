import { VimValue } from "neovim/lib/types/VimValue"

import { execCommand } from "@/util/system"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { generateFromVimVariables } from "@/fzf/resource/vim-variable-generator"
import { GlobalVariableName, FzfOptions } from "@/type"

export const projectFiles = () => {
  const command = generateFromVimVariables<GlobalVariableName, VimValue>(createGlobalVariableSelector, (selector) =>
    selector("fzfPreviewFilelistCommand")
  )

  if (typeof command !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(command)

  if (stderr !== "" || status !== 0) {
    console.log("Failed to get the file list")
    return []
  }

  return stdout.split("\n")
}

export const projectFilesDefaultOptions = () =>
  generateFromVimVariables<GlobalVariableName, FzfOptions>(createGlobalVariableSelector, (selector) => ({
    "--prompt": '"ProjectFiles> "',
    "--multi": true,
    "--preview": `"${selector("fzfPreviewCommand")}"`
  }))
