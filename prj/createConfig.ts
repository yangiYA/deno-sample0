/**
 * deno 用 import map 作成用スクリプト。"/src/" を絶対パスで解決するために生成する。
 * 第1引数に import_map.json を格納しているディレクトリを絶対パスで指定する。
 */
import { parse } from "https://deno.land/std/flags/mod.ts";
import { if_func } from "/src/commonLang.js";
import * as posix from "std/path/posix.ts";

const importMapJsonStringFunc = (srcPath: string) =>
  `{
  "imports": {
    "std/": "https://deno.land/std@0.153.0/",
    "/src/" : "${srcPath}"
  }
}
`;

type argsType = {
  _: string[];
};
const args = parse(Deno.args) as argsType;
const argList = args._;

const tmpTargetDirPath: string = if_func(argList.length >= 1)
  .then(() => argList[0])
  .else(() => null);

console.debug("!!! argList:", argList);
if (!tmpTargetDirPath) {
  console.info("\nディレクトリのパスを引数に指定してください\n");
  Deno.exit(1);
}

const targetDirPath = tmpTargetDirPath.replaceAll("\\", "/");
console.debug("targetDirPath:", targetDirPath);


/*** for deno_foo/prj/import_map.json ***/
await Deno.writeTextFile(
  `${posix.join(targetDirPath, "import_map.json")}`,
  importMapJsonStringFunc("./src/"),
);

/*** for deno_foo/prj/main/import_map_tmp.json ***/
await Deno.writeTextFile(
  `${posix.join(targetDirPath, "main", "import_map_tmp.json")}`,
  importMapJsonStringFunc(
    posix.join(targetDirPath, "src/").replaceAll("C:/", "/"),
  ),
);

/*** for deno_foo/prj/webview/import_map_tmp.json ***/
await Deno.writeTextFile(
  `${posix.join(targetDirPath, "webview", "import_map_tmp.json")}`,
  importMapJsonStringFunc(
    posix.join(targetDirPath, "src/").replaceAll("C:/", "/"),
  ),
);
