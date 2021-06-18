const request = require("supertest");
const app = require("../app");

describe("Test the root path: /", () => {
  test("it should be OK to GET homepage", () => {
    return request(app)
      .get("/")
      .expect(200)
      .expect(/Golist API/);
  });
});
