import { Request, RequestHandler, Response } from "express";
import {
  DocumentSnapshot,
  QuerySnapshot,
  DocumentReference,
} from "@google-cloud/firestore";
import firestore from "../../configs/firestore";

var express = require("express");
var router = express.Router();

router.get("/", function (req: Request, res: Response, _next: RequestHandler) {
  firestore
    .collection("users")
    .listDocuments()
    .then((refs: DocumentReference[]) => {
      res.json({ uids: refs.map((x) => x.id) });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.get(
  "/:uid",
  function (req: Request, res: Response, _next: RequestHandler) {
    firestore
      .collection("users")
      .doc(req.params.uid)
      .get()
      .then((snapshot: DocumentSnapshot) => {
        if (snapshot.exists) {
          res.json(snapshot.data());
        } else {
          res.status(404).json({ err: `User ${req.params.uid} not found` });
        }
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
);

router.get(
  "/:uid/lists",
  function (req: Request, res: Response, _next: RequestHandler) {
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
      });
  }
);

module.exports = router;
