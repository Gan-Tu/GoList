import request from "supertest";
import app from "../app";
import UserService from "../services/users";
import { decodeBearerToken } from "../utils/auth";

var createError = require("http-errors");

// -------------------------------- Jest Mocks --------------------------------

jest.mock("../utils/auth");
const mockDecodeBearerToken = decodeBearerToken as jest.MockedFunction<
  typeof decodeBearerToken
>;
mockDecodeBearerToken.mockImplementation(async (idToken, _checkRevoked) => {
  // Fake test method that decodes fake test token
  if (idToken.startsWith("validTokenFor-")) {
    return { uid: idToken.split("validTokenFor-")[1] };
  } else {
    throw Error("Invalid token");
  }
});

jest.mock("../services/users.ts");
const UserServiceMock = UserService as jest.MockedClass<typeof UserService>;

// ---------------------------------- TESTS ----------------------------------

describe("test /users: listing all users", () => {
  test("it should be OK", () => {
    UserServiceMock.prototype.listUsers.mockResolvedValueOnce(["testUserUid"]);
    return request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200, { uids: ["testUserUid"] });
  });
});

describe("test /users/:uid: getting users details", () => {
  test("it should be OK if authenticated as user", () => {
    const mockedUser = {
      uid: "testUserUid",
      displayName: "Test User",
      photoURL: "https://picsum.photos/200",
    };
    UserServiceMock.prototype.getUser.mockResolvedValueOnce(mockedUser);
    return request(app)
      .get("/users/testUserUid")
      .set("Authorization", "Bearer validTokenFor-testUserUid")
      .expect("Content-Type", /json/)
      .expect(200, mockedUser);
  });

  test("it should be 401 error if missing auth token", () => {
    return request(app)
      .get("/users/testUserUid")
      .expect("Content-Type", /json/)
      .expect(401, { err: "Missing valid Bearer token", ok: false });
  });

  test("it should be 401 error if using other users' auth token", () => {
    return request(app)
      .get("/users/testUserUid")
      .set("Authorization", "Bearer validTokenFor-someoneElse")
      .expect("Content-Type", /json/)
      .expect(401, {
        err: "Unauthorized. User can only access its own resource",
        ok: false,
      });
  });

  // test("it should be 404 error for getting unknown users", () => {
  //   UserServiceMock.prototype.getUser.mockRejectedValueOnce(
  //     createError(404, "User noSuchUserId not found")
  //   );
  //   return request(app)
  //     .get("/users/noSuchUserId")
  //     .set("Authorization", "Bearer validTokenFor-testUserUid")
  //     .expect("Content-Type", /json/)
  //     .expect(404, {
  //       ok: false,
  //       err: "User noSuchUserId not found",
  //     });
  // });
});

describe("test /users/:uid/lists: getting lists owned by users", () => {
  test("it should be OK, if authenticated", () => {
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
      .set("Authorization", "Bearer validTokenFor-testUserUid")
      .expect("Content-Type", /json/)
      .expect(200, {
        lists: mockedLists,
      });
  });

  test("it should be 401 error if missing auth token", () => {
    return request(app)
      .get("/users/testUserUid/lists")
      .expect("Content-Type", /json/)
      .expect(401, { err: "Missing valid Bearer token", ok: false });
  });

  test("it should be 401 error if using other users' auth token", () => {
    return request(app)
      .get("/users/testUserUid/lists")
      .set("Authorization", "Bearer validTokenFor-someoneElse")
      .expect("Content-Type", /json/)
      .expect(401, {
        err: "Unauthorized. User can only access its own resource",
        ok: false,
      });
  });

  // test("it should be 404 and empty for unknown users or those without lists", () => {
  //   UserServiceMock.prototype.getUserLists.mockResolvedValueOnce([]);
  //   return request(app)
  //     .get("/users/noSuchUserId/lists")
  //     .set("Authorization", "Bearer validTokenFor-testUserUid")
  //     .expect("Content-Type", /json/)
  //     .expect(404, { lists: [] });
  // });
});
