import { Request, NextFunction, Response } from "express";
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
  firestore
    .collection("users")
    .listDocuments()
    .then((refs: DocumentReference[]) => {
      res.json({ uids: refs.map((x) => x.id) });
    })
    .catch(next);
});

router.get("/:uid", function (req: Request, res: Response, next: NextFunction) {
  firestore
    .collection("users")
    .doc(req.params.uid)
    .get()
    .then((snapshot: DocumentSnapshot) => {
      if (snapshot.exists) {
        res.json(snapshot.data());
      } else {
        next(createError(404, `User ${req.params.uid} not found`));
      }
    })
    .catch(next);
});

router.get(
  "/:uid/lists",
  function (req: Request, res: Response, next: NextFunction) {
    firestore
      .collection("lists")
      .where("ownerUid", "==", req.params.uid)
      .get()
      .then((querySnapshot: QuerySnapshot) => {
        if (querySnapshot.empty) {
          return res.json({ data: [] });
        } else {
          return res.json({
            lists: querySnapshot.docs.map((x) => {
              return {
                uid: x.id,
                ...x.data(),
              };
            }),
          });
        }
      })
      .catch(next);
  }
);

module.exports = router;
