import type { Processors } from "@/type"
import { pluginCommand } from "@/plugin"

type OpenCommand = "edit" | "split" | "vsplit" | "tabedit"

const openFilesCreator = (openCommand: OpenCommand) => (files: Array<string>) => {
  files.forEach((file) => {
    pluginCommand(`execute 'silent ${openCommand} ${file}'`)
  })
}

export const defaultProcessors: Processors = {
  "": openFilesCreator("edit"),
  "ctrl-s": openFilesCreator("split"),
  "ctrl-v": openFilesCreator("vsplit"),
  "ctrl-t": openFilesCreator("tabedit")
}

export const createOpenFileProcessor = (processor: Processor = defaultProcessor): Processor => processor
