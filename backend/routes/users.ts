import { Request, NextFunction, Response } from "express";
import UserService from "../services/users";
import { verifyUserIsAuthenticated } from "../configs/auth";

var express = require("express");
var router = express.Router();

var userService = new UserService();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  userService
    .listUsers()
    .then((uids) => res.json({ uids }))
    .catch(next);
});

router.get(
  "/:uid",
  verifyUserIsAuthenticated,
  function (req: Request, res: Response, next: NextFunction) {
    userService
      .getUser(req.params.uid)
      .then((data) => res.json(data))
      .catch(next);
  }
);

router.get(
  "/:uid/lists",
  verifyUserIsAuthenticated,
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
