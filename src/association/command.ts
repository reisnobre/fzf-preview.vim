import { parseDictionaryFilesArgs } from "@/args"
import { convertIdentity } from "@/fzf/converter"
import { openFileProcesses } from "@/fzf/process"
import {
  allBuffers,
  allBuffersDefaultOptions,
  buffers,
  buffersDefaultOptions,
  directoryFiles,
  directoryFilesDefaultOptions,
  dropBufnr,
  dropGitStatusPrefix,
  gitFiles,
  gitFilesDefaultOptions,
  gitStatus,
  gitStatusDefaultOptions,
  projectFiles,
  projectFilesDefaultOptions,
  projectMruFiles,
  projectMruFilesDefaultOptions,
  projectMrwFiles,
  projectMrwFilesDefaultOptions,
  projectOldFiles,
  projectOldFilesDefaultOptions
} from "@/fzf/resource"
import type { FzfCommand } from "@/type"

const vimCommandOptions = {
  nargs: "?",
  sync: true
} as const

export const commandDefinition: ReadonlyArray<FzfCommand> = [
  {
    commandName: "TSFzfPreviewProjectFiles",
    sourceFunc: projectFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitFiles",
    sourceFunc: gitFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: gitFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewDirectoryFiles",
    sourceFunc: directoryFiles,
    convertLine: convertIdentity,
    sourceFuncArgsParser: parseDictionaryFilesArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: directoryFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitStatus",
    sourceFunc: gitStatus,
    convertLine: dropGitStatusPrefix,
    vimCommandOptions,
    defaultFzfOptionFunc: gitStatusDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewBuffers",
    sourceFunc: buffers,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: buffersDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewAllBuffers",
    sourceFunc: allBuffers,
    convertLine: dropBufnr,
    vimCommandOptions,
    defaultFzfOptionFunc: allBuffersDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewProjectOldFiles",
    sourceFunc: projectOldFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectOldFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectMruFiles",
    sourceFunc: projectMruFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectMruFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectMrwFiles",
    sourceFunc: projectMrwFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectMrwFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  }
] as const
