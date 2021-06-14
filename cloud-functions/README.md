# GoList Cloud Functions

`create-user-document`:

When new users are created, or first signed in, using GoList firebase
authentication, create a corresponding user document at the `/users/<uid>` with
the firebase provided user information.

`delete-user-artifacts`: 

When a user is deleted that exists in the GoList firebase authentication,
delete the corresponding user document at the `/users/<uid>`, and all list
documents at `/lists` whose `ownerUid` is the user.

## Continuous Deployment

The changes are auto deployed to GCP cloud functions, upon pushes to the `main`
branch that touches any files under this directory, excluding the README file.