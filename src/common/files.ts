import * as fs from "fs";

export const readTextFileSync = (path: string): string => {
  return fs.readFileSync(path, { encoding: "utf8" });
};

export const readTextFileRowsSync = (path: string): string[] => {
  return readTextFileSync(path).split("\n");
};
