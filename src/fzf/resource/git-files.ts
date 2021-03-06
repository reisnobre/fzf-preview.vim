import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execSyncCommand } from "@/system/command"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const gitFilesCommand = globalVariableSelector("fzfPreviewGitFilesCommand")

  if (typeof gitFilesCommand !== "string") {
    return { lines: [] }
  }

  const { stdout, stderr, status } = execSyncCommand(gitFilesCommand)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${gitFilesCommand}"`)
  }

  return { lines: stdout.split("\n").filter((file) => file !== "") }
}

export const gitFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})
