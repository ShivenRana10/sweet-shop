jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("Sweet Inventory Management", () => {
  let sweetId;

  it("admin adds a sweet", async () => {
    jwt.verify.mockReturnValue({ id: "1", role: "admin" });

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer admintoken")
      .send({ name: "Jalebi", price: 15, quantity: 1 });

    sweetId = res.body.id;
    expect(res.statusCode).toBe(201);
  });

  it("user purchases sweet", async () => {
    jwt.verify.mockReturnValue({ id: "2", role: "user" });

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", "Bearer usertoken");

    expect(res.statusCode).toBe(200);
  });

  it("should block purchase when out of stock", async () => {
    jwt.verify.mockReturnValue({ id: "2", role: "user" });

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", "Bearer usertoken");

    expect(res.statusCode).toBe(400);
  });

  it("admin restocks sweet", async () => {
    jwt.verify.mockReturnValue({ id: "1", role: "admin" });

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", "Bearer admintoken")
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(200);
  });
});
