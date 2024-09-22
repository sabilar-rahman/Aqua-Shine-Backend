import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Creates a refresh token for the user.
 *
 * @param {Object} jwtPayload - Payload to be included in the JWT token
 * @param {string} secret - Secret key for signing the JWT token
 * @param {string} expiresIn - Duration in seconds for which the token is valid
 * @returns {string} - Refresh token
 */

export const createRefreshToken = (
  jwtPayload: { userEmail: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};


export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
