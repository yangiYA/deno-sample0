// import { Webview } from "https://deno.land/x/webview/mod.ts";
import { Webview } from "https://deno.land/x/webview@0.7.3/mod.ts";
// 0.7.4 は例外発生し動作しないため注意!! 
// https://deno.land/x/webview@0.7.4
import { readAll } from "/src/ioUtils.ts";
import { log, logToFile } from "/src/logUtils.ts";
import { SampleCounter } from "/src/sampleCounter.ts";

const counter = new SampleCounter();

const html = readAll("./index.html", "utf-8");

const webview = new Webview();
webview.navigate(`data:text/html,${encodeURIComponent(html)}`);

const countUp = () => {
  log.info("You call countUp!!!");
  counter.countup();
  log.info(`SampleCounter.count=${counter.count} !!`);
};

const nowCount = () => {
  return counter.count;
};
webview.bind("countUp", countUp);
webview.bind("nowCount", nowCount);

webview.run();
