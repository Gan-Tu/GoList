const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});
firestore.settings({
  ignoreUndefinedProperties: true,
});
  
/**
 * Triggered by a change to a Firebase Auth user object.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.createUserDoc = (event, context) => {
  // The unique id of the user whose auth record changed
  const uid = event.uid;
  // log out the uid that caused the function to be triggered
  console.log('Function triggered by change to user: ' +  uid);
  // now log the full event object
  console.log(JSON.stringify(event));

  return firestore.collection("users").doc(uid).set({
    uid: event.uid,
    displayName: event.displayName,
    photoURL: event.photoURL,
    email: event.email,
    emailVerified: event.emailVerified,
  });
};
