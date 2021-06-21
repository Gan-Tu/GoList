import admin from "../configs/firebase";
import { CurrentUserRequestObject } from "../interfaces/users";

// Verify if a token is valid, and if so, decode it and return a user object
// If validation fails, this function will throw errors for caller.
export async function decodeBearerToken(
  idToken: string,
  checkRevoked?: boolean | undefined
): Promise<CurrentUserRequestObject> {
  const { uid, email } = await admin
    .auth()
    .verifyIdToken(idToken, checkRevoked);
  return { uid, email };
}
