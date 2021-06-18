import { Request, Response, NextFunction } from "express";
import ListService from "../../services/lists";

var express = require("express");
var router = express.Router();

var listService = new ListService();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  let { name } = req.query;
  if (name) {
    name = (Array.isArray(name) ? name[0] : name) as string;
    listService
      .getAllListIdsByName(name)
      .then((uids) => {
        let statusCode = uids.length > 0 ? 200 : 404;
        res.status(statusCode).json({ uids });
      })
      .catch(next);
  } else {
    listService
      .getAllListIds()
      .then((uids) => res.json({ uids }))
      .catch(next);
  }
});

router.get("/:uid", function (req: Request, res: Response, next: NextFunction) {
  listService
    .getList(req.params.uid)
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
