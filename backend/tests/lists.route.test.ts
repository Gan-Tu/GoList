import request from "supertest";
import app from "../app";

var createError = require("http-errors");

// Mock Firestore Results
jest.mock("../services/lists.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllListIds: jest.fn().mockResolvedValue(["ListId1", "ListId2"]),
      getAllListIdsByName: jest.fn().mockImplementation((name) => {
        if (name === "ListId1" || name === "ListId2") {
          return Promise.resolve([name]);
        } else {
          return Promise.resolve([]);
        }
      }),
      getList: jest.fn().mockImplementation((uid) => {
        if (uid === "ListId1" || uid === "ListId2") {
          return Promise.resolve({
            name: uid,
            ownerUid: "testUserId",
            createTime: 1623623674475,
            title: "Test List",
            description: "list created for test purposes",
          });
        } else {
          return Promise.reject(createError(404, `List ${uid} not found`));
        }
      }),
    };
  });
});

describe("test the lists route: /lists", () => {
  test("it should be OK to get all list IDs with /lists", () => {
    return request(app)
      .get("/lists")
      .expect("Content-Type", /json/)
      .expect(200, { uids: ["ListId1", "ListId2"] });
  });

  describe("test getting lists IDs by name with /lists?name=xxx", () => {
    test("it should be OK if lists exist with name", () => {
      return request(app)
        .get("/lists")
        .query({ name: "ListId1" })
        .expect("Content-Type", /json/)
        .expect(200, { uids: ["ListId1"] });
    });

    test("it should be 404 error and empty if no lists exist with name", () => {
      return request(app)
        .get("/lists")
        .query({ name: "noSuchListId" })
        .expect("Content-Type", /json/)
        .expect(404, { uids: [] });
    });
  });

  describe("test getting lists with /lists/:uid", () => {
    test("it should be OK to get existing lists", () => {
      return request(app)
        .get("/lists/ListId1")
        .expect("Content-Type", /json/)
        .expect(200, {
          name: "ListId1",
          ownerUid: "testUserId",
          createTime: 1623623674475,
          title: "Test List",
          description: "list created for test purposes",
        });
    });

    test("it should be 404 error for getting unknown lists", () => {
      return request(app)
        .get("/lists/noSuchListId")
        .expect("Content-Type", /json/)
        .expect(404, {
          ok: false,
          err: "List noSuchListId not found",
        });
    });
  });
});
