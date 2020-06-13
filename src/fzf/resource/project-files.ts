import { createExecuteCommandSelector } from "@/module/execute-command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { store } from "@/store"
import { execCommand } from "@/system/command"
import { convertForFzf } from "@/system/fzf"
import { isGitDirectory } from "@/system/project"
import type { SourceFuncArgs } from "@/type"

export const projectFiles = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const globalVariableSelector = createGlobalVariableSelector(store)
  const executeCommandSelector = createExecuteCommandSelector(store)
  const filelistCommand = globalVariableSelector("fzfPreviewFilelistCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(filelistCommand)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${filelistCommand}"`)
  }

  const files = stdout.split("\n").filter((file) => file !== "")

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    return convertForFzf(files)
  } else {
    return files
  }
}

export const projectFilesDefaultOptions = () => ({
  "--prompt": '"ProjectFiles> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewCommand")}"`
})
