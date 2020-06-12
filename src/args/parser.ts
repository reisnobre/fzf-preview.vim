import yargs from "yargs"

export const argsParser = () => {
  yargs.option("add-fzf-args", { type: "string" })
  yargs.option("processes", { type: "string" })
  yargs.parserConfiguration({
    "camel-case-expansion": false,
    "unknown-options-as-args": true
  })
  return yargs
}
