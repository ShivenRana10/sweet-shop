jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("Admin Middleware", () => {
  it("should allow admin access", async () => {
    jwt.verify.mockReturnValue({ id: "1", role: "admin" });

    const response = await request(app)
      .get("/api/admin/dashboard")
      .set("Authorization", "Bearer admintoken");

    expect(response.statusCode).toBe(200);
  });

  it("should block non-admin access", async () => {
    jwt.verify.mockReturnValue({ id: "1", role: "user" });

    const response = await request(app)
      .get("/api/admin/dashboard")
      .set("Authorization", "Bearer usertoken");

    expect(response.statusCode).toBe(403);
  });
});
