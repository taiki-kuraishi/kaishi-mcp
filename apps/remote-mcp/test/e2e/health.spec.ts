import { describe, expect, it } from "vitest";

describe("test /", () => {
  it("test health", async () => {
    // act
    const response = await fetch("http://localhost:8787/");

    // assert
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: "OK" });
  });
});
