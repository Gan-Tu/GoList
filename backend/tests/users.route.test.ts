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

describe("test authentication", () => {
  describe.each(["/users/testUserUid", "/users/testUserUid/lists"])(
    "GET %s",
    (endpoint) => {
      test("it should be 401 error if missing auth token", () => {
        return request(app)
          .get(endpoint)
          .expect("Content-Type", /json/)
          .expect(401, { err: "Missing valid Bearer token", ok: false });
      });

      test("it should be 401 error if authenticated as others", () => {
        return request(app)
          .get(endpoint)
          .set("Authorization", "Bearer validTokenFor-someoneElse")
          .expect("Content-Type", /json/)
          .expect(401, {
            err: "Unauthorized. User can only access its own resource",
            ok: false,
          });
      });
    }
  );
});

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
  test("it should be OK if user exists", () => {
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

  test("it should be 404 error if user profile cannot be found", () => {
    UserServiceMock.prototype.getUser.mockRejectedValueOnce(
      createError(404, "User testUserUid not found")
    );
    // It's unlikely we have token for unknown users, but it could happen
    // for security attacks, or the user just got deleted prior to the
    // handling of the request
    return request(app)
      .get("/users/testUserUid")
      .set("Authorization", "Bearer validTokenFor-testUserUid")
      .expect("Content-Type", /json/)
      .expect(404, {
        ok: false,
        err: "User testUserUid not found",
      });
  });
});

describe("test /users/:uid/lists: getting lists owned by users", () => {
  test("it should be OK, if user owns lists", () => {
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

  test("it should be 404 error if no lists are owned by user", () => {
    UserServiceMock.prototype.getUserLists.mockResolvedValueOnce([]);
    return request(app)
      .get("/users/testUserUid/lists")
      .set("Authorization", "Bearer validTokenFor-testUserUid")
      .expect("Content-Type", /json/)
      .expect(404, { lists: [] });
  });
});
