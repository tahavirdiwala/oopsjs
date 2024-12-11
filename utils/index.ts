require("dotenv").config();
import fs from "fs";

const getEnvConfig = (key: string) => {
    if (process.env[key]) return process.env[key];
    else throw new Error("env key does not exist");
};

/**
 * @param {string} dir - current directory for files.
 * @returns {string[]} all files inside current directory
 */
const getFiles = (dir: string) => {
    return fs.readdirSync(dir);
};

export { getEnvConfig, getFiles }