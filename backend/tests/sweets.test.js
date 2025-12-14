jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("Sweet APIs", () => {
  it("admin should add a sweet", async () => {
    jwt.verify.mockReturnValue({ id: "1", role: "admin" });

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer admintoken")
      .send({ name: "Ladoo", price: 10, quantity: 100 });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Ladoo");
  });

  it("user should fetch sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
  });

  it("non-admin should NOT add sweet", async () => {
    jwt.verify.mockReturnValue({ id: "2", role: "user" });

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer usertoken")
      .send({ name: "Barfi", price: 20, quantity: 50 });

    expect(res.statusCode).toBe(403);
  });
});
