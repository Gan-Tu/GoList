import * as admin from "firebase-admin";

if (process.env.NODE_ENV === "development") {
  admin.initializeApp({
    credential: admin.credential.cert("./golist-backend-credentials.json"),
  });
} else {
  admin.initializeApp();
}

export default admin;
