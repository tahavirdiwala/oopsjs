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
    else throw new Error("env key does not exist");
  }

  getOsEnvArray(key: string, delimiter = ","): string[] {
    return (process.env[key] && process.env[key].split(delimiter)) || [];
  }

  getPath(path: string): string {
    return process.env.NODE_ENV === "production"
      ? join(process.cwd(), "/dist/" + path.slice(0, -3) + ".js")
      : join(process.cwd(), path);
  }

  getPaths(paths: string[]): string[] {
    return paths.map(this.getPath);
  }

  getOsPaths(key: string): string[] {
    return this.getPaths(this.getOsEnvArray(key));
  }
}

const utilityDecorators = new UtilityDecorators();

export default utilityDecorators;
