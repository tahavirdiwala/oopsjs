import jwt, { JwtPayload, VerifyCallback } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PassWordConfig } from "../lib/constant";
import { env } from "../lib/env";

/**
 * Sets a jwt response for given user.
 * @param {object} user - User fields object.
 * @param {string} expiry - expiry for jwt token.
 */
const createTokenFor = (user: any, expiry: string) => {
  return jwt.sign(user, env.JwtSecret, {
    expiresIn: expiry,
  });
};

const hashField = async (password: string) => {
  return await bcrypt.hash(password, PassWordConfig.Range);
};

function verifyToken<T = void>(
  token: string,
  cb?: VerifyCallback<JwtPayload | string>
) {
  try {
    return jwt.verify(token, env.JwtSecret, cb) as T;
  } catch (error) {
    throw error;
  }
}

export { createTokenFor, verifyToken, hashField };
