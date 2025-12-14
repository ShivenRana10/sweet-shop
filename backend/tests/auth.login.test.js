const request = require("supertest");
const app = require("../src/app");

describe("Auth Login API", () => {
  it("should login an existing user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
