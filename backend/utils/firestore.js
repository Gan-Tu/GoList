var Firestore = require("@google-cloud/firestore");

let firestore;
if (process.env.NODE_ENV === "production") {
  firestore = new Firestore();
} else {
  firestore = new Firestore({
    projectId: "golist-backend",
    keyFilename: "./golist-backend-credentials.json",
  });
}

module.exports = firestore;
