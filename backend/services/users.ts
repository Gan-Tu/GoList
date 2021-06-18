import firestore from "../configs/firestore";
var createError = require("http-errors");

export default class UserService {
  async listUsers() {
    try {
      const refs = await firestore.collection("users").listDocuments();
      return refs.map((x) => x.id);
    } catch (error) {
      console.error(error);
      throw createError(500, `Failed to listUsers due to ${error}`);
    }
  }

  async getUser(uid: string) {
    try {
      var snapshot = await firestore.doc(`/users/${uid}`).get();
    } catch (error) {
      console.error(error);
      throw createError(500, `Failed to getUser due to ${error}`);
    }
    if (snapshot.exists) {
      return snapshot.data();
    } else {
      throw createError(404, `User ${uid} not found`);
    }
  }

  async getUserLists(uid: string) {
    try {
      const querySnapshot = await firestore
        .collection("lists")
        .where("ownerUid", "==", uid)
        .get();
      return querySnapshot.docs.map((x) => ({
        uid: x.id,
        ...x.data(),
      }));
    } catch (error) {
      console.error(error);
      throw createError(500, `Failed to getUserLists due to ${error}`);
    }
  }
}
