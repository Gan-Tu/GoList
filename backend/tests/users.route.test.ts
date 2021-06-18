import request from "supertest";
import app from "../app";

var createError = require("http-errors");

// Mock Firestore Results
jest.mock("../services/users.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      listUsers: jest.fn().mockResolvedValue(["testUserUid"]),
      getUser: jest.fn().mockImplementation((uid) => {
        if (uid === "testUserUid") {
          return Promise.resolve({
            uid: "testUserUid",
            displayName: "Test User",
            photoURL: "https://picsum.photos/200",
          });
        } else {
          return Promise.reject(createError(404, `User ${uid} not found`));
        }
      }),
      getUserLists: jest.fn().mockImplementation((uid) => {
        if (uid === "testUserUid") {
          return Promise.resolve([
            {
              uid: "testListUid",
              ownerUid: "testUserUid",
              createTime: 1623623674475,
              name: "test",
              title: "Test List",
              description: "list created for test purposes",
            },
          ]);
        } else {
          return Promise.resolve([]);
        }
      }),
    };
  });
});

describe("test the users route: /users", () => {
  test("it should be OK to list all users with /", () => {
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200, { uids: ["testUserUid"] });
  });

  describe("test getting users with /users/:uid", () => {
    test("it should be OK to get existing users", () => {
      return request(app)
        .get("/users/testUserUid")
        .expect("Content-Type", /json/)
        .expect(200, {
          uid: "testUserUid",
          displayName: "Test User",
          photoURL: "https://picsum.photos/200",
        });
    });

    test("it should be 404 error for getting unknown users", () => {
      return request(app)
        .get("/users/noSuchUserId")
        .expect("Content-Type", /json/)
        .expect(404, {
          ok: false,
          err: "User noSuchUserId not found",
        });
    });
  });

  describe("test getting lists owned by users with /users/:uid/lists", () => {
    test("it should be OK for users that have lists", () => {
      return request(app)
        .get("/users/testUserUid/lists")
        .expect("Content-Type", /json/)
        .expect(200, {
          lists: [
            {
              uid: "testListUid",
              ownerUid: "testUserUid",
              createTime: 1623623674475,
              name: "test",
              title: "Test List",
              description: "list created for test purposes",
            },
          ],
        });
    });

    test("it should be 404 and empty for unknown users or those without lists", () => {
      return request(app)
        .get("/users/noSuchUserId/lists")
        .expect("Content-Type", /json/)
        .expect(404, { lists: [] });
    });
  });
});
