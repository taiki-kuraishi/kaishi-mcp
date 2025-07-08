import { env } from "cloudflare:test";
import { SyllabusFactory } from "@script/database/factories";
import { prepareTrpcClient } from "@test/helpers/prepare-trpc-client";
import { TransactionTestHelper } from "@test/helpers/transactionTestHelper";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test syllabusRouter.getAll", async () => {
  const client = await prepareTrpcClient({ env });
  const transactionHelper = new TransactionTestHelper(env.DATABASE_URL);
  const db = transactionHelper.db;
  let syllabusFactory: SyllabusFactory;

  beforeEach(async () => {
    await transactionHelper.begin();
    syllabusFactory = new SyllabusFactory(db);
  });

  afterEach(async () => {
    await transactionHelper.rollback();
  });

  it("should retrieve all syllabuses", async () => {
    // arrange
    const expected = await syllabusFactory.create();

    // act
    const res = await client.syllabusRouter.getAll();

    // assert
    expect(res).toContainEqual(expected);
  });
});
