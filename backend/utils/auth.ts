import admin from "../configs/firebase";
import { Request, Response, NextFunction } from "express";
var createError = require("http-errors");

export async function decodeIDToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (req.token) {
    if (process.env.NODE_ENV != "production") {
      console.warn(
        "[WARNING!!!!] Should NOT decode ID token in non-production environment"
      );
    }
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(req.token);
      const { uid, email } = decodedToken;
      req.currentUser = { uid, email };
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
  if (process.env.NODE_ENV === "production") {
    let uid = req.params.uid || req.body.uid;
    if (!req.currentUser) {
      return next(createError(401, "Missing valid Bearer token"));
    }
    if (!uid || req.currentUser?.uid != uid) {
      return next(createError(401, "Unauthorized"));
    }
  } else {
    console.info("Skipped authentication verification in non-prod env");
  }
  next();
}
