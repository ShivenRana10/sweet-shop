const request = require("supertest");
const app = require("../src/app");

describe("Auth Registration API", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    expect(response.statusCode).toBe(201);
  });
});
