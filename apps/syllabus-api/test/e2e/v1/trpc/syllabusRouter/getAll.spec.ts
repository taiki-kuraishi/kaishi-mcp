import { env } from "cloudflare:test";
import { SyllabusFactory } from "@test/factories";
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
    const expected = await syllabusFactory.create({
      name: "マシンラーニング実習",
      startTerm: 1,
      endTerm: 2,
      category: "実習",
      credits: "2",
      dayOfWeek: 3,
      period: 2,
      location: "米山キャンパスz",
      isCompulsory: false,
      description:
        "マシンラーニングの内容を踏まえ、商用分野におけるアプリケーションに、機械学習がどのように利用されているかを理解するとともに、本格的なAIアプリケーションに必要とされる大規模ニューラルネットワークの実装とその応用法を理解する。主に、大規模深層学習、音声認識、自然言語処理、その他AI活用などの実アプリケーションの実装を通し、自ら実行環境の設計・構築を行えるスキルを養成する。",
      learningObjectives:
        "１．商用分野におけるアプリケーションに機械学習がどのように利用されているか理解する。２．本格的なAIアプリケーションに必要とされる大規模ニューラルネットワークの実装とその応用法を理解する。３．より野心的で先進的な機械学習アプローチについて理解する。",
      version: "1.0",
      deletedAt: null,
    });

    // act
    const res = await client.syllabusRouter.getAll();

    // assert
    expect(res).toContainEqual(
      expect.objectContaining({
        id: expected.id,
        name: expected.name,
        startTerm: expected.startTerm,
        endTerm: expected.endTerm,
        category: expected.category,
        credits: expected.credits,
        dayOfWeek: expected.dayOfWeek,
        period: expected.period,
        location: expected.location,
        isCompulsory: expected.isCompulsory,
        description: expected.description,
        learningObjectives: expected.learningObjectives,
        version: expected.version,
        deletedAt: expected.deletedAt,
      }),
    );
  });

  it("should demonstrate factory make() and create() methods", async () => {
    const syllabusData = syllabusFactory.make({
      name: "テストファクトリー講義",
      category: "講義",
    });

    expect(syllabusData.name).toBe("テストファクトリー講義");
    expect(syllabusData.category).toBe("講義");
    expect(syllabusData.startTerm).toBeTypeOf("number");
    expect(syllabusData.endTerm).toBeTypeOf("number");
    expect(syllabusData.credits).toBeTypeOf("string");
    expect(syllabusData.location).toBeTypeOf("string");

    const savedSyllabus = await syllabusFactory.create({ name: "保存テスト" });
    expect(savedSyllabus.id).toBeDefined();
    expect(savedSyllabus.name).toBe("保存テスト");
    expect(savedSyllabus.createdAt).toBeInstanceOf(Date);
    expect(savedSyllabus.updatedAt).toBeInstanceOf(Date);
  });
});
