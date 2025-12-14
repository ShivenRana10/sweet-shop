jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

describe("Sweet Inventory Management", () => {
  let sweetId;

  beforeEach(async () => {
    jwt.verify.mockReturnValue({ id: "1", role: "admin" });

    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", "Bearer admintoken")
      .send({ name: "Jalebi", price: 15, quantity: 1 });

    sweetId = res.body._id;
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

    // first purchase
    await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", "Bearer usertoken");

    // second purchase → out of stock
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
