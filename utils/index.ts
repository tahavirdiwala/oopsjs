require("dotenv").config();
import fs from "fs";
import { join } from "path";

const getEnvConfig = (key: string) => {
  if (process.env[key]) return process.env[key];
  else throw new Error("env key does not exist");
};

function getOsEnvArray(key: string, delimiter = ","): string[] {
  return (process.env[key] && process.env[key].split(delimiter)) || [];
}

function getPath(path: string): string {
  return process.env.NODE_ENV === "production"
    ? join(process.cwd(), "/dist/" + path.slice(0, -3) + ".js")
    : join(process.cwd(), path);
}

function getPaths(paths: string[]): string[] {
  return paths.map((p) => {
    return getPath(p);
  });
}

function getOsPaths(key: string): string[] {
  return getPaths(getOsEnvArray(key));
}

/**
 * @param {string} dir - current directory for files.
 * @returns {string[]} all files inside current directory
 */
const getFiles = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

export { getEnvConfig, getFiles, getOsPaths };
