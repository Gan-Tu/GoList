import { Request, Response, NextFunction } from "express";
import * as listNameHandler from "./listName";

var express = require("express");
var router = express.Router();

router.get("/", function (_req: Request, res: Response, _next: NextFunction) {
  res.render("index", { title: "Golist Namespace API" });
});

router.get("/lists/:name", listNameHandler.getListNameMetadata);
router.get("/lists/:name/exists", listNameHandler.listNameExists);

module.exports = router;
