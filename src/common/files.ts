import * as fs from "fs";

export const readTextFileSync = (path: string): string => {
  return fs.readFileSync(path, { encoding: "utf8" });
};
