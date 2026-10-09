process.env.NODE_ENV ="test";
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const env = require("../config/env");
const User = require("../models/User");
const Store = require("../models/Store");

beforeAll(async () => {
  await mongoose.connect(env.mongoUri);
});

afterAll(async () => {
  await User.deleteMany({ email: /test.*@pegasus\.com/ });
  await Store.deleteMany({ email: /test.*@pegasus\.com/ });
  await mongoose.connection.close();
});

describe("Auth API", () => {
  const testEmail = `testowner${Date.now()}@pegasus.com`;
  let token;

  test("POST /api/auth/register - creates owner + store", async () => {
    const res = await request(app).post("/api/auth/register").send({
      businessName: "Dessy's perfumery",
      email: testEmail,
      phone: "08077984688",
      address: "5 olumo St",
      city: "Ikorodu",
      state: "Lagos",
      country: "Nigeria",
      name: "Dessy",
      password: "testpass123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    token = res.body.data.token;
  });

  test("POST /api/auth/register - rejects duplicate email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      businessName: "Lade's meals",
      email: testEmail,
      name: "Omolade Adeshayo",
      password: "testpass123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("POST /api/auth/login - logs in successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "testpass123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

  test("POST /api/auth/login - rejects wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testEmail,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
  });

  test("GET /api/auth/me - returns user with valid token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe(testEmail);
  });
  test ("GET /api/auth/me -rejects with no token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.statusCode).toBe(401);
  });
});