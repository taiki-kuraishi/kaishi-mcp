import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("test GET /", () => {
  it("test 200 OK", async () => {
    // act
    const response = await SELF.fetch("http://localhost:8788/");

    // assert
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: "OK" });
  });
});
