import { env } from "cloudflare:test";
import { SyllabusFactory } from "@script/database/factories";
import { prepareTrpcClient } from "@test/helpers/prepare-trpc-client";
import { TransactionTestHelper } from "@test/helpers/transactionTestHelper";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test syllabusRouter.searchSyllabusIds", async () => {
  const transactionHelper = new TransactionTestHelper(env.DATABASE_URL);
  const db = transactionHelper.db;
  const client = await prepareTrpcClient({ databaseClient: transactionHelper.db });
  const syllabusFactory = new SyllabusFactory(db);

  beforeEach(async () => {
    await transactionHelper.begin();
  });

  afterEach(async () => {
    await transactionHelper.rollback();
  });

  it("should search syllabuses by name", async () => {
    // arrange
    const targetName = "Computer Science";
    const syllabus1 = await syllabusFactory.create({ name: targetName });
    const syllabus2 = await syllabusFactory.create({ name: "Mathematics" });
    const syllabus3 = await syllabusFactory.create({ name: "Computer Science Advanced" });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({ name: targetName });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).toContain(syllabus3.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses by term", async () => {
    // arrange
    const targetTerm = 1;
    const syllabus1 = await syllabusFactory.create({ startTerm: targetTerm, endTerm: targetTerm });
    const syllabus2 = await syllabusFactory.create({ startTerm: 2, endTerm: 2 });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({
      startTerm: targetTerm,
      endTerm: targetTerm,
    });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses by category", async () => {
    // arrange
    const targetCategory = "必修";
    const syllabus1 = await syllabusFactory.create({ category: targetCategory });
    const syllabus2 = await syllabusFactory.create({ category: "選択" });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({ category: targetCategory });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses by credits", async () => {
    // arrange
    const targetCredits = "2";
    const syllabus1 = await syllabusFactory.create({ credits: targetCredits });
    const syllabus2 = await syllabusFactory.create({ credits: "4" });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({ credits: targetCredits });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses by day of week and period", async () => {
    // arrange
    const targetDayOfWeek = 1; // 月曜日
    const targetPeriod = 2; // 2限
    const syllabus1 = await syllabusFactory.create({
      dayOfWeek: targetDayOfWeek,
      period: targetPeriod,
    });
    const syllabus2 = await syllabusFactory.create({
      dayOfWeek: 2,
      period: 3,
    });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({
      dayOfWeek: targetDayOfWeek,
      period: targetPeriod,
    });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses by location", async () => {
    // arrange
    const targetLocation = "神楽坂";
    const syllabus1 = await syllabusFactory.create({ location: targetLocation });
    const syllabus2 = await syllabusFactory.create({ location: "野田" });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({ location: targetLocation });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses by compulsory flag", async () => {
    // arrange
    const syllabus1 = await syllabusFactory.create({ isCompulsory: true });
    const syllabus2 = await syllabusFactory.create({ isCompulsory: false });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({ isCompulsory: true });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses by description", async () => {
    // arrange
    const targetDescription = "プログラミングの基礎";
    const syllabus1 = await syllabusFactory.create({ description: targetDescription });
    const syllabus2 = await syllabusFactory.create({ description: "数学の基礎" });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({ description: targetDescription });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses by learning objectives", async () => {
    // arrange
    const targetObjectives = "アルゴリズムの理解";
    const syllabus1 = await syllabusFactory.create({ learningObjectives: targetObjectives });
    const syllabus2 = await syllabusFactory.create({ learningObjectives: "数学の理解" });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({
      learningObjectives: targetObjectives,
    });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
  });

  it("should search syllabuses with multiple criteria", async () => {
    // arrange
    const targetName = "Computer Science";
    const targetCredits = "2";
    const targetLocation = "神楽坂";

    const syllabus1 = await syllabusFactory.create({
      name: targetName,
      credits: targetCredits,
      location: targetLocation,
    });
    const syllabus2 = await syllabusFactory.create({
      name: targetName,
      credits: "4",
      location: targetLocation,
    });
    const syllabus3 = await syllabusFactory.create({
      name: "Mathematics",
      credits: targetCredits,
      location: targetLocation,
    });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({
      name: targetName,
      credits: targetCredits,
      location: targetLocation,
    });

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).not.toContain(syllabus2.id);
    expect(res).not.toContain(syllabus3.id);
  });

  it("should return empty array when no syllabuses match", async () => {
    // arrange
    await syllabusFactory.create({ name: "Mathematics" });
    await syllabusFactory.create({ name: "Physics" });

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({ name: "Chemistry" });

    // assert
    expect(res).toEqual([]);
  });

  it("should return all syllabuses when no criteria provided", async () => {
    // arrange
    const syllabus1 = await syllabusFactory.create();
    const syllabus2 = await syllabusFactory.create();

    // act
    const res = await client.syllabusRouter.searchSyllabusIds({});

    // assert
    expect(res).toContain(syllabus1.id);
    expect(res).toContain(syllabus2.id);
  });
});
