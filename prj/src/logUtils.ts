import * as logStd from "https://deno.land/std/log/mod.ts";

const defaultFormatter = (logRecord: logStd.LogRecord) => {
  const { datetime, levelName, msg } = logRecord;

  // 日付の形式を調整
  const d = new Date(datetime.getTime() - datetime.getTimezoneOffset() * 6e4);
  const logTime = d.toISOString().slice(0, -5) +
    d.toString().replace(/^.*GMT([-+]\d{2})(\d{2}).*$/, "$1:$2");

  // levelの文字数を調整
  return `${logTime} ${levelName.padEnd(7)} ${msg}`;
};

const fileFormatter = (logRecord: logStd.LogRecord) => {
  return JSON.stringify({
    region: logRecord.loggerName,
    ts: logRecord.datetime,
    level: logRecord.levelName,
    data: logRecord.msg,
  });
};

await logStd.setup({
  //define handlers
  handlers: {
    console: new logStd.handlers.ConsoleHandler("DEBUG", {
      formatter: defaultFormatter,
    }),
    file: new logStd.handlers.RotatingFileHandler("INFO", {
      filename: "./deno_sample.log",
      maxBytes: 10000000,
      maxBackupCount: 3,
      formatter: fileFormatter,
    }),
  },

  //assign handlers to loggers
  loggers: {
    default: {
      level: "DEBUG",
      // handlers: ["console"],
      handlers: ["console", "file"],
    },
    fileLogger: {
      level: "INFO",
      handlers: ["file"],
    },
  },
});

export const log = logStd.getLogger();
export const logToFile = logStd.getLogger("fileLogger");
