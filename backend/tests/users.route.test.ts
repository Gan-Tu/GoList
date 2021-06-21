import request from "supertest";
import app from "../app";
import UserService from "../services/users";

var createError = require("http-errors");

jest.mock("../services/users.ts");
const UserServiceMock = UserService as jest.MockedClass<typeof UserService>;

describe("test the users route: /users", () => {
  test("it should be OK to list all users with /users", () => {
    UserServiceMock.prototype.listUsers.mockResolvedValueOnce(["testUserUid"]);
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200, { uids: ["testUserUid"] });
  });

  describe("test getting users with /users/:uid", () => {
    test("it should be OK to get user detail", () => {
      const mockedUser = {
        uid: "testUserUid",
        displayName: "Test User",
        photoURL: "https://picsum.photos/200",
      };
      UserServiceMock.prototype.getUser.mockResolvedValueOnce(mockedUser);
      return request(app)
        .get("/users/testUserUid")
        .expect("Content-Type", /json/)
        .expect(200, mockedUser);
    });

    test("it should be 404 error for getting unknown users", () => {
      UserServiceMock.prototype.getUser.mockRejectedValueOnce(
        createError(404, "User noSuchUserId not found")
      );
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
      const mockedLists = [
        {
          uid: "testListUid",
          ownerUid: "testUserUid",
          createTime: 1623623674475,
          name: "test",
          title: "Test List",
          description: "list created for test purposes",
        },
      ];
      UserServiceMock.prototype.getUserLists.mockResolvedValueOnce(mockedLists);
      return request(app)
        .get("/users/testUserUid/lists")
        .expect("Content-Type", /json/)
        .expect(200, {
          lists: mockedLists,
        });
    });

    test("it should be 404 and empty for unknown users or those without lists", () => {
      UserServiceMock.prototype.getUserLists.mockResolvedValueOnce([]);
      return request(app)
        .get("/users/noSuchUserId/lists")
        .expect("Content-Type", /json/)
        .expect(404, { lists: [] });
    });
  });
});
