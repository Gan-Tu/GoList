import { Firestore } from "@google-cloud/firestore";

let firestore: Firestore;
if (process.env.NODE_ENV === "development") {
  firestore = new Firestore({
    projectId: "golist-backend",
    keyFilename: "./golist-backend-credentials.json",
  });
} else {
  firestore = new Firestore();
}

firestore.settings({
  ignoreUndefinedProperties: true,
});

export default firestore;
