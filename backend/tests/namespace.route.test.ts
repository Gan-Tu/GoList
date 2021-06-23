import request from "supertest";
import app from "../app";
import NamespaceService from "../services/namespace";

var createError = require("http-errors");

jest.mock("../services/namespace.ts");
const NamespaceServiceMock = NamespaceService as jest.MockedClass<
  typeof NamespaceService
>;

describe("test the namespace route: / v", () => {
  test("test /: it should be OK", () => {
    return request(app)
      .get("/namespace")
      .expect(200)
      .expect(/Golist Namespace API/);
  });

  describe("test GET /namespace/lists/:name", () => {
    test("it should be OK if list name metadata exists", () => {
      const mockedMetadata = {
        name: "test",
        liveListUid: "JJ2DAX4MaRRGFS3cbtLB",
        reserved: true,
      };
      NamespaceServiceMock.prototype.getListNameMetadata.mockResolvedValueOnce(
        mockedMetadata
      );
      return request(app)
        .get("/namespace/lists/test")
        .expect("Content-Type", /json/)
        .expect(200, mockedMetadata);
    });

    test("it should be 404 error if list name metadata does not exist", () => {
      NamespaceServiceMock.prototype.getListNameMetadata.mockRejectedValueOnce(
        createError(404, "List name test not found")
      );
      return request(app)
        .get("/namespace/lists/test")
        .expect("Content-Type", /json/)
        .expect(404, { err: "List name test not found", ok: false });
    });
  });

  describe("test GET /namespace/lists/:name/exists", () => {
    test("it should be OK and true, if list name exists", () => {
      NamespaceServiceMock.prototype.listNameExists.mockResolvedValueOnce(true);
      return request(app)
        .get("/namespace/lists/test/exists")
        .expect("Content-Type", /json/)
        .expect(200, { exists: true });
    });

    test("it should be OK and false, if list name does not exists", () => {
      NamespaceServiceMock.prototype.listNameExists.mockResolvedValueOnce(
        false
      );
      return request(app)
        .get("/namespace/lists/test/exists")
        .expect("Content-Type", /json/)
        .expect(200, { exists: false });
    });
  });
});
