const request = require("supertest");
const app = require("../src/app");

describe("Auth Registration API", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message");
  });
});
