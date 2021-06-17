import { Request, Response, NextFunction } from "express";
import {
  DocumentSnapshot,
  QuerySnapshot,
  DocumentReference,
} from "@google-cloud/firestore";
import firestore from "../../configs/firestore";

var express = require("express");
var router = express.Router();
var createError = require("http-errors");

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  let { name } = req.query;
  if (name) {
    firestore
      .collection("lists")
      .where("name", "==", name)
      .select()
      .get()
      .then((querySnapshot: QuerySnapshot) => {
        return res.json({ uids: querySnapshot.docs.map((x) => x.id) });
      })
      .catch(next);
  } else {
    firestore
      .collection("lists")
      .listDocuments()
      .then((refs: DocumentReference[]) => {
        res.json({ uids: refs.map((x) => x.id) });
      })
      .catch(next);
  }
});

router.get("/:uid", function (req: Request, res: Response, next: NextFunction) {
  firestore
    .collection("lists")
    .doc(req.params.uid)
    .get()
    .then((snapshot: DocumentSnapshot) => {
      if (snapshot.exists) {
        res.json(snapshot.data());
      } else {
        next(createError(404, `List ${req.params.uid} not found`));
      }
    })
    .catch(next);
});

module.exports = router;
