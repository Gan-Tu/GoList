import firestore from "../configs/firestore";
var createError = require("http-errors");

export default class NamespaceService {
  async getListNameMetadata(name: string) {
    try {
      var snapshot = await firestore.doc(`/listNames/${name}`).get();
    } catch (error) {
      console.error(error);
      throw createError(500, `Failed to getListNameMetadata due to ${error}`);
    }
    if (snapshot.exists) {
      return snapshot.data();
    } else {
      throw createError(404, `List name ${name} not found`);
    }
  }

  async listNameExists(name: string): Promise<boolean> {
    try {
      const snapshot = await firestore
        .collection("listNames")
        .where("name", "==", name)
        .select()
        .limit(1)
        .get();
      return snapshot.docs.length > 0;
    } catch (error) {
      console.error(error);
      throw createError(500, `Failed to run listNameExists due to ${error}`);
    }
  }
}
