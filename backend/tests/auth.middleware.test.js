jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("JWT Auth Middleware", () => {
  it("should allow access with valid token", async () => {
    jwt.verify.mockReturnValue({ id: "user123" });

    const response = await request(app)
      .get("/api/protected")
      .set("Authorization", "Bearer validtoken");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("should block access without token", async () => {
    const response = await request(app).get("/api/protected");
    expect(response.statusCode).toBe(401);
  });
});
