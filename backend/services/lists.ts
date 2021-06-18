import firestore from "../configs/firestore";
var createError = require("http-errors");

export default class ListService {
  async getAllListIds() {
    try {
      const refs = await firestore.collection("lists").listDocuments();
      return refs.map((x) => x.id);
    } catch (error) {
      console.error(error);
      throw createError(500, `Failed to getAllListIds due to ${error}`);
    }
  }

  async getAllListIdsByName(name: string) {
    try {
      const snapshot = await firestore
        .collection("lists")
        .where("name", "==", name)
        .select()
        .get();
      return snapshot.docs.map((x) => x.id);
    } catch (error) {
      console.error(error);
      throw createError(500, `Failed to getAllListIdsByName due to ${error}`);
    }
  }

  async getList(uid: string) {
    let snapshot;
    try {
      snapshot = await firestore.doc(`/lists/${uid}`).get();
    } catch (error) {
      console.error(error);
      throw createError(500, `Failed to getList due to ${error}`);
    }

    if (snapshot.exists) {
      return snapshot.data();
    } else {
      throw createError(404, `List ${uid} not found`);
    }
  }
}
