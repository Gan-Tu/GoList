import request from "supertest";
import app from "../app";
import ListService from "../services/lists";

var createError = require("http-errors");

jest.mock("../services/lists.ts");
const ListServiceMock = ListService as jest.MockedClass<typeof ListService>;

describe("test the lists route: /lists", () => {
  test("it should be OK to get all list IDs with /lists", () => {
    ListServiceMock.prototype.getAllListIds.mockResolvedValueOnce([
      "ListId1",
      "ListId2",
    ]);
    return request(app)
      .get("/lists")
      .expect("Content-Type", /json/)
      .expect(200, { uids: ["ListId1", "ListId2"] });
  });

  describe("test getting lists IDs by name with /lists?name=xxx", () => {
    test("it should be OK if lists exist with name", () => {
      ListServiceMock.prototype.getAllListIdsByName.mockResolvedValueOnce([
        "ListId1",
      ]);
      return request(app)
        .get("/lists")
        .query({ name: "ListId1" })
        .expect("Content-Type", /json/)
        .expect(200, { uids: ["ListId1"] });
    });

    test("it should be 404 error and empty if no lists exist with name", () => {
      ListServiceMock.prototype.getAllListIdsByName.mockResolvedValueOnce([]);
      return request(app)
        .get("/lists")
        .query({ name: "noSuchListId" })
        .expect("Content-Type", /json/)
        .expect(404, { uids: [] });
    });
  });

  describe("test getting lists with /lists/:uid", () => {
    test("it should be OK to get existing lists", () => {
      const mockedList = {
        name: "ListId1",
        ownerUid: "testUserId",
        createTime: 1623623674475,
        title: "Test List",
        description: "list created for test purposes",
      };
      ListServiceMock.prototype.getList.mockResolvedValueOnce(mockedList);
      return request(app)
        .get("/lists/ListId1")
        .expect("Content-Type", /json/)
        .expect(200, mockedList);
    });

    test("it should be 404 error for getting unknown lists", () => {
      ListServiceMock.prototype.getList.mockRejectedValueOnce(
        createError(404, "List noSuchListId not found")
      );
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
