import "reflect-metadata";
import { prepareTrpcClient } from "@test/helpers/prepare-trpc-client";
import { describe, expect, it } from "vitest";

describe("test healthCheck", () => {
  it("responds with status ok", async () => {
    // arrange
    const client = await prepareTrpcClient({});

    // act
    const res = await client.healthCheck();

    // assert
    expect(res).toEqual({ status: "ok" });
  });
});
