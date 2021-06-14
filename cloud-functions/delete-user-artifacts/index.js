const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

/**
 * Triggered by a change to a Firebase Auth user object.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.deleteUserArtifacts = (event, context) => {
  // The unique id of the user whose auth record changed
  const uid = event.uid;
  // log out the uid that caused the function to be triggered
  console.log('Function triggered by deletion to user: ' +  uid);
  // now log the full event object
  console.log(JSON.stringify(event));

  // Delete user document
  firestore.collection('users').doc(uid).delete().then(() => {
    console.info(`User document deleted: /users/${uid}`);
  }).catch(err => console.error(err));

  // Delete Lists created by the user
  firestore
    .collection("lists")
    .where("ownerUid", "==", uid)
    .get()
    .then((querySnapshot) => {
      const batch = firestore.batch();
      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      batch.commit().then(() => {
        console.info(`Successfully deleted ${querySnapshot.size} lists documents created by user ${uid}.`);
      }).catch(err => console.error(err));
    });
};
