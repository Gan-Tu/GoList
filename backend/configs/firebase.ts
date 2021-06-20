import * as admin from "firebase-admin";

if (process.env.NODE_ENV === "production") {
  admin.initializeApp();
} else {
  admin.initializeApp({
    credential: admin.credential.cert("./golist-backend-credentials.json"),
  });
}

export default admin;
