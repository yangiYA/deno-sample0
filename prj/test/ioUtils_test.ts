import { readAll, readLines } from "/src/ioUtils.ts";
// import { assertArrayIncludes, assertEquals } from "std/testing/asserts.ts";
import { assertEquals } from "std/testing/asserts.ts";
// import { getLogger } from "std/log/mod.ts";
// const log = getLogger();
// const log = console;

Deno.test("readLines メソッド でファイルを読み込めることを確認", async () => {
  const tmpArray: Array<string> = [];
  await readLines("test/utf8.txt", false, (record: string) => {
    tmpArray.push(record);
  });
  assertEquals(
    `1行目`,
    tmpArray[0],
  );
  assertEquals(
    `2行目`,
    tmpArray[1],
  );
});

Deno.test("readAll メソッド でファイルを読み込めることを確認", () => {
  const resultStr = readAll("test/windows31j.txt", "shift-jis");
  const hoge = resultStr.split(/\n|\r\n/);
  assertEquals(
    `win31j1行目`,
    hoge[0],
  );
  assertEquals(
    `win31j2行目`,
    hoge[1],
  );
});
