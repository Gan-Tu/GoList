import { Request, NextFunction, Response } from "express";
import UserService from "../services/users";
import { enableAuth } from "../configs/auth";

var express = require("express");
var router = express.Router();
var createError = require("http-errors");

var userService = new UserService();

// --------------------------- Authentication Rules ---------------------------

// Verify that the user accessing the resource is authenticated
router.param(
  "uid",
  (req: Request, _res: Response, next: NextFunction, uid: string) => {
    if (enableAuth()) {
      if (!req.currentUser) {
        return next(createError(401, "Missing valid Bearer token"));
      } else if (!uid || req.currentUser?.uid != uid) {
        return next(
          createError(
            401,
            `Unauthorized. User can only access its own resource`
          )
        );
      }
    }
    next();
  }
);

// ---------------------------------- Routes ----------------------------------

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  userService
    .listUsers()
    .then((uids) => res.json({ uids }))
    .catch(next);
});

router.get("/:uid", function (req: Request, res: Response, next: NextFunction) {
  userService
    .getUser(req.params.uid)
    .then((data) => res.json(data))
    .catch(next);
});

router.get(
  "/:uid/lists",
  function (req: Request, res: Response, next: NextFunction) {
    userService
      .getUserLists(req.params.uid)
      .then((lists) => {
        let statusCode = lists.length > 0 ? 200 : 404;
        res.status(statusCode).json({ lists });
      })
      .catch(next);
  }
);

module.exports = router;
