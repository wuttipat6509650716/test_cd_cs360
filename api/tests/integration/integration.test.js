const { describe, beforeAll, afterAll, it, expect } = require("@jest/globals");
const { setupStrapi, stopStrapi } = require("../helpers/strapi");

beforeAll(async () => {
  // singleton so it can be called many times
  await setupStrapi();
});

afterAll(async () => {
  await stopStrapi();
});

describe("strapi instance", () => {
  it("is defined", () => {
    expect(strapi).toBeDefined();
  });
});

require("./profile");