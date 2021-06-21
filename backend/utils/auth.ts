import admin from "../configs/firebase";
import { Request, Response, NextFunction } from "express";
import { CurrentUserRequestObject } from "../interfaces/users";
var createError = require("http-errors");

// Verify if a token is valid, and if so, return a currentUser object
export async function verifyIdToken(
  idToken: string,
  checkRevoked?: boolean | undefined
): Promise<CurrentUserRequestObject> {
  try {
    const { uid, email } = await admin
      .auth()
      .verifyIdToken(idToken, checkRevoked);
    return Promise.resolve({ uid, email });
  } catch (error) {
    return Promise.reject(error);
  }
}

// If a Bearer token is provided, decode and verify it.
// If successful, inject a new req.currentUser for subsequent use.
export async function decodeBearerToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (req.token) {
    try {
      const currentUser = await verifyIdToken(req.token);
      if (currentUser) {
        req.currentUser = currentUser;
      }
    } catch (err) {
      return next(createError(401, `Failed to verify Bearer token: ${err}`));
    }
  }
  next();
}

export async function verifyUserIsAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.currentUser) {
    return next(createError(401, "Missing valid Bearer token"));
  }
  let uid = req.params.uid || req.body.uid;
  if (!uid || req.currentUser?.uid != uid) {
    return next(createError(401, "Unauthorized"));
  }
  next();
}
