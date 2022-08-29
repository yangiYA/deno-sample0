import { readAll } from "/src/ioUtils.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";
import { if_func } from "/src/commonLang.js";

const logHelpMessage = () => console.log(helpMessage());
Deno.args.forEach((it) => {
  // console.debug("******Deno.args it " + it);
  if (it == "--help" || it == "-h") {
    logHelpMessage();
    Deno.exit(0);
  }
});

function helpMessage(): string {
  const msg = `
  Usage: mainHellowFileRead [options...] <テキストファイルのPATH>
        --encoding エンコーディング
    -h, --help This help text
  `;
  return msg;
}

type argsType = {
  _: string[];
  encoding: string | undefined;
};

const args = parse(Deno.args) as argsType;
const argList = args._;

const inFilePath = if_func(argList.length == 1)
  .then(() => argList[0])
  .else(() => null);

if (!inFilePath) {
  console.info(`\n入力ファイルのPATH を指定してください. arg=${inFilePath}\n`);
  logHelpMessage();
  Deno.exit(1);
}

console.info(`\nHello File Read !! Input File Name : ${inFilePath}\n`);
const contents = readAll(inFilePath, args.encoding);
console.info(contents);
