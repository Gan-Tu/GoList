import { Request, RequestHandler, Response } from "express";
import {
  DocumentSnapshot,
  QuerySnapshot,
  DocumentReference,
} from "@google-cloud/firestore";
import firestore from "../../utils/firestore";

var express = require("express");
var router = express.Router();

router.get("/", function (req: Request, res: Response, _next: RequestHandler) {
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
      .catch((err) => {
        res.status(500).json({ err });
      });
  } else {
    firestore
      .collection("lists")
      .listDocuments()
      .then((refs: DocumentReference[]) => {
        res.json({ uids: refs.map((x) => x.id) });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
});

router.get(
  "/:uid",
  function (req: Request, res: Response, _next: RequestHandler) {
    firestore
      .collection("lists")
      .doc(req.params.uid)
      .get()
      .then((snapshot: DocumentSnapshot) => {
        if (snapshot.exists) {
          res.json(snapshot.data());
        } else {
          res.status(404).json({ err: `List ${req.params.uid} not found` });
        }
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
);

module.exports = router;
