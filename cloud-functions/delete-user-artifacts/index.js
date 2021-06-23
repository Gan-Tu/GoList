const Firestore = require("@google-cloud/firestore");
const firestore = new Firestore({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

/**
 * Triggered by a change to a Firebase Auth user object.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.deleteUserArtifacts = async (event, context) => {
  // The unique id of the user whose auth record changed
  const uid = event.uid;
  // log out the uid that caused the function to be triggered
  console.log("Function triggered by deletion to user: " + uid);
  // now log the full event object
  console.log(JSON.stringify(event));

  try {
    // Delete user document
    await firestore.collection("users").doc(uid).delete();
    console.info(`User document deleted: /users/${uid}`);
  } catch (error) {
    console.error(`Failed to delete /users/${uid}: ${error}`);
  }

  try {
    // Delete Lists created by the user
    const querySnapshot = await firestore
      .collection("lists")
      .where("ownerUid", "==", uid)
      .select()
      .get();

    if (querySnapshot.empty) {
      console.info(`No list documents found for ${uid}. Nothing to delete`);
      return;
    }

    const batch = firestore.batch();
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.info(
      `Successfully deleted ${querySnapshot.size} lists documents created by user ${uid}.`
    );
  } catch (error) {
    console.error(
      `Failed to delete ${querySnapshot.size} lists documents created by user ${uid}: ${error}`
    );
  }
};
