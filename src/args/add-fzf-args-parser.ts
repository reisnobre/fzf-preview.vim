import { argsParser } from "@/args/parser"
import type { AddFzfArgs, ArgsOptions } from "@/type"

const optionsToAddFzfArgs = (options: ArgsOptions): Array<string> => {
  if (options["add-fzf-args"] && Array.isArray(options["add-fzf-args"])) {
    return options["add-fzf-args"]
  }
  if (options["add-fzf-args"] && typeof options["add-fzf-args"] === "string") {
    return [options["add-fzf-args"]]
  }
  return []
}

const parseOptions = (options: ArgsOptions) => {
  const addFzfArgs = optionsToAddFzfArgs(options)

  const notExistsValueOptions: Array<AddFzfArgs> = addFzfArgs
    .map((arg) => /(--?\S+)$/.exec(arg))
    .filter((match): match is RegExpExecArray => match !== null && !match[0].includes("="))
    .map((match) => {
      return { optionName: match[1] }
    })

  const existsValueOptions: Array<AddFzfArgs> = addFzfArgs
    .map((arg) => /(--?\S+)=(.+)$/.exec(arg))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => {
      return { optionName: match[1], value: match[2] }
    })

  return notExistsValueOptions.concat(existsValueOptions)
}

export const parseAddFzfArgs = (args: string) => {
  const parser = argsParser()
  const options = parser.parse(args)

  return parseOptions(options)
}
