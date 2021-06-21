import { Request, Response, NextFunction } from "express";
import { decodeBearerToken } from "./auth";

var createError = require("http-errors");

// If a Bearer token exists in `req.token`, try to verify and decode the token
// If valid, inject a `req.currentUser` for authenticated user.
// If no Bearer token is found, this does nothing.
//
// If `errorOnInvalidToken` is true (defined in configs/auth.ts), throw 401
// error if the bearer token is provided but not valid.
export function injectCurrentUserFromBearerToken() {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (req.token) {
      try {
        req.currentUser = await decodeBearerToken(req.token);
      } catch (err) {
        return next(createError(401, `Failed to verify Bearer token: ${err}`));
      }
    }
    next();
  };
}
