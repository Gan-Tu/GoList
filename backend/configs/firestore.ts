import { Firestore } from "@google-cloud/firestore";

let firestore: Firestore;
if (process.env.NODE_ENV === "production") {
  firestore = new Firestore();
} else {
  firestore = new Firestore({
    projectId: "golist-backend",
    keyFilename: "./golist-backend-credentials.json",
  });
}

firestore.settings({
  ignoreUndefinedProperties: true,
});

export default firestore;
