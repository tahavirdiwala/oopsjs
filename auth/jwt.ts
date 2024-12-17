import jwt from "jsonwebtoken";
import { env } from "../lib/env";
import bcrypt from "bcryptjs";
import { PassWordConfig } from "../lib/constant";

/**
 * Sets a jwt response for given user.
 * @param {object} user - User fields object.
 * @param {string} expiry - expiry for jwt token.
 */
const createTokenFor = (user: object, expiry: string) => {
  return jwt.sign(user, env.JwtSecret, {
    expiresIn: expiry,
  });
};

const hashField = async (password: string) => {
  return await bcrypt.hash(password, PassWordConfig.Range);
};

function verifyToken(token: string): any {
  try {
    return jwt.verify(token, env.JwtSecret);
  } catch (e) {
    return null;
  }
}

export { createTokenFor, verifyToken, hashField };
