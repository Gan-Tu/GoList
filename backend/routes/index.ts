import { Request, RequestHandler, Response } from "express";

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (_req: Request, res: Response, _next: RequestHandler) {
  res.render("index", { title: "Golist API" });
});

module.exports = router;
