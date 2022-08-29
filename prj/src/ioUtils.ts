import { BufReader, readLines as readLinesByIO } from "std/io/mod.ts";
// import * as path from "std/path/mod.ts";
import { readAllSync, writeAllSync } from "std/streams/conversion.ts";
import { log } from "/src/logUtils.ts";

/**
 * fileName で指定したファイルを読み込み、 1行毎に、 func で指定された関数を適用する。
 *
 * @param fileName
 * @param isSkipFirstLine
 * @param func
 * @param encoding
 */
export async function readLines(
  fileName: string,
  isSkipFirstLine: boolean,
  func: (prm: string) => void | Promise<void> = ((it) => {
    log.debug(it);
    return;
  }),
  encoding?: string, /*** デフォルトは utf-8 ***/
): Promise<void> {
  const decoderOpts = {
    encoding: encoding || "utf-8",
  };
  // const filenameAbs = path.join(Deno.cwd(), fileName);
  // log.debug(`******${filenameAbs}`);
  const fileReader = await Deno.open(fileName);
  let skip = isSkipFirstLine;
  try {
    for await (const line of readLinesByIO(fileReader, decoderOpts)) {
      if (skip) { // 1行目のみスキップするか否かを判定する意図のif文
        skip = false;
      } else {
        await func(line);
      }
    }
  } catch (error) {
    throw error;
  } finally {
    Deno.close(fileReader.rid);
  }
}

/**
 * fileName を読み込み 文字列として返却する
 * @param fileName ファイル名 または 、 ファイルパス
 * @param encoding ファイルエンコーディング。指定しない場合 utf-8
 * @returns ファイルから読み取った文字列
 */
export function readAll(
  fileName: string,
  encoding?: string, /*** デフォルトは utf-8 ***/
): string {
  // const filenameAbs = path.join(Deno.cwd(), fileName);
  const file = Deno.openSync(fileName, { read: true });
  const myFileContent: Uint8Array = readAllSync(file);
  Deno.close(file.rid);
  const decoder = new TextDecoder(encoding || "utf-8");
  const tmpStr = decoder.decode(myFileContent);
  return tmpStr;
}

/**
 * fileName で指定したファイルを読み込み、 1行目の文字列を返却する。
 *
 * @param fileName
 * @param encoding
 * @returns 1行目の文字列
 */
export async function firstLine(fileName: string, encoding?: string) {
  // const filenameAbs = path.join(Deno.cwd(), fileName);
  const fileReader = await Deno.open(fileName);
  const bufReader = new BufReader(fileReader);
  try {
    const res = await bufReader.readLine();
    if (res) {
      const dec = new TextDecoder(encoding);
      const resString = dec.decode(res.line);

      log.debug(`[DEBUG] |*|*|*|*|*|*|*|*|*| resString=${resString}`);
      return resString;
    } else {
      return "";
    }
  } catch (error) {
    throw error;
  } finally {
    Deno.close(fileReader.rid);
  }
}

/**
 * outfileName へ outString の内容を出力する。
 *
 * @param outfileName
 * @param outString
 */
export async function writeFile(outfileName: string, outString: string) {
  const file = await Deno.open(outfileName, {
    write: true,
    create: true,
  });
  const encoder = new TextEncoder();
  const contentBytes = encoder.encode(outString);
  try {
    writeAllSync(file, contentBytes);
  } catch (error) {
    throw error;
  } finally {
    Deno.close(file.rid);
  }
}
