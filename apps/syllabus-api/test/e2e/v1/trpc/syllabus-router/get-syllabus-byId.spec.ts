import { env } from "cloudflare:test";
import { SyllabusFactory } from "@script/database/factories";
import { prepareTrpcClient } from "@test/helpers/prepare-trpc-client";
import { TransactionTestHelper } from "@test/helpers/transactionTestHelper";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test syllabusRouter.getSyllabusById", async () => {
  const transactionHelper = new TransactionTestHelper(env.DATABASE_URL);
  const client = await prepareTrpcClient({ env, dbClient: transactionHelper.db });
  const db = transactionHelper.db;
  const syllabusFactory = new SyllabusFactory(db);

  beforeEach(async () => {
    await transactionHelper.begin();
  });

  afterEach(async () => {
    await transactionHelper.rollback();
  });

  it("should get syllabus by valid id", async () => {
    // arrange
    const expected = await syllabusFactory.create();

    // act
    const res = await client.syllabusRouter.getSyllabusById(expected.id);

    // assert
    expect(res).toEqual(expected);
  });

  it("should return null for non-existent id", async () => {
    // arrange
    const nonExistentId = "123e4567-e89b-12d3-a456-426614174000";

    // act
    const res = await client.syllabusRouter.getSyllabusById(nonExistentId);

    // assert
    expect(res).toBeNull();
  });
});
