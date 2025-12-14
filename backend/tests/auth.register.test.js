const request = require("supertest");

describe("Auth Registration API", () => {
  it("should register a new user", async () => {
    const response = await request("http://localhost:3000")
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message");
  });
});
