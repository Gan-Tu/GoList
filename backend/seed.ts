import { UserMetadata } from "./interfaces/users";
import { ListItem } from "./interfaces/lists";
import { ListNameMetadata } from "interfaces/namespace";
import firestore from "./configs/firestore";

async function createUser(user: UserMetadata) {
  try {
    await firestore.collection("users").doc(user.uid).set({ user });
  } catch (error) {
    console.log(error);
  }
}

async function createLists(lists: ListItem[]) {
  try {
    const batch = firestore.batch();
    for (let lst of lists) {
      const ref = firestore.collection("lists").doc();
      batch.set(ref, {
        ...lst,
        createTime: Date.now(),
      });
    }
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}

async function createListNameMetadata(metadata: ListNameMetadata[]) {
  try {
    const batch = firestore.batch();
    for (let x of metadata) {
      const ref = firestore.collection("listNames").doc(x.name);
      batch.set(ref, x);
    }
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}

// createUser(tugan);

// createLists([
//   {
//     ownerUid: "ES91CCWX7iQr8EmkRivaiWVd9852",
//     name: "test",
//     title: "Test List",
//     description: "list created for test purposes",
//   },
//   {
//     ownerUid: "ES91CCWX7iQr8EmkRivaiWVd9852",
//     name: "demo",
//     title: "demo List",
//     description: "list created for demo purposes",
//   },
// ]);

// createListNameMetadata([
//   {
//     name: "demo",
//     liveListUid: "q3ZKN960rOZLvWtmsQo7",
//     reserved: true,
//   },
//   {
//     name: "test",
//     liveListUid: "JJ2DAX4MaRRGFS3cbtLB",
//     reserved: true,
//   },
// ]);
