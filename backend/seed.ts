import { UserMetadata } from "./interfaces/users";
import { ListItem } from "./interfaces/lists";
import firestore from "./configs/firestore";

let tugan: UserMetadata = {
  uid: "KNhZ0Zhct8PVPVvYMTuD7ZLpRug2",
  displayName: "Gan Tu",
  photoURL:
    "https://lh3.googleusercontent.com/a-/AOh14Gi_DPusgc9MPQGFGeI-Rgm5h-mAqRUXTzgis7-Q5w=s96-c",
};

let tuganLists: ListItem[] = [
  {
    ownerUid: "KNhZ0Zhct8PVPVvYMTuD7ZLpRug2",
    name: "test",
    title: "Test List",
    description: "list created for test purposes",
  },
  {
    ownerUid: "KNhZ0Zhct8PVPVvYMTuD7ZLpRug2",
    name: "demo",
    title: "demo List",
    description: "list created for demo purposes",
  },
];

function createUser(user: UserMetadata) {
  firestore.collection("users").doc(user.uid).set({ tugan });
}

function createLists(lists: ListItem[]) {
  const batch = firestore.batch();
  for (let lst of lists) {
    const ref = firestore.collection("lists").doc();
    batch.set(ref, {
      ...lst,
      createTime: Date.now(),
    });
  }
  batch.commit();
}

// createUser(tugan);
// createLists(tuganLists);
