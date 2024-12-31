require("dotenv").config();
import fs from "fs";
import { join } from "path";

class UtilityDecorators {
  /**
   * @param {string} dir - current directory for files.
   * @returns {string[]} all files inside current directory
   */
  getFiles(dir: string): string[] {
    return fs.readdirSync(dir);
  }

  /**
   * @param {string} key - for accessing env with provided key.
   * @returns {string} returns value of associated key
   */
  getEnvConfig(key: string): string {
    if (process.env[key]) return process.env[key];
    else throw new Error(`env with given ${key} does not exist`);
  }

  /**
   * @param {string} key - for accessing env with provided key.
   * @param {string} delimiter separator for given key
   * @returns {string[]} returns array of string
   */
  getOsEnvArray(key: string, delimiter: string = ","): string[] {
    return (process.env[key] && process.env[key].split(delimiter)) || [];
  }

  /**
   * @param {string} path - current path of file
   * @returns {string} returns path for current environment
   */
  getPath(path: string): string {
    return process.env.NODE_ENV === "production"
      ? join(process.cwd(), "/dist/" + path.slice(0, -3) + ".js")
      : join(process.cwd(), path);
  }

  /**
   * @param {string[]} paths - current path of file
   * @returns {string[]} returns paths for current environment
   */
  getPaths(paths: string[]): string[] {
    return paths.map(this.getPath);
  }

  /**
   * @param {string} key - get all paths of inside folder by specified key
   * @returns {string[]} returns paths for current folder
   */
  getOsPaths(key: string): string[] {
    return this.getPaths(this.getOsEnvArray(key));
  }
}

const utilityDecorators = new UtilityDecorators();

export default utilityDecorators;
