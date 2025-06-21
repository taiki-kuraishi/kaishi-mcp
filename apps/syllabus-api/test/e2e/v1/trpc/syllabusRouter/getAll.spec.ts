import { env } from "cloudflare:test";
import type { DrizzleClient } from "@src/libs/drizzle-orm/clients";
import { Syllabus } from "@src/models/syllabus";
import { prepareTrpcClient } from "@test/helpers/prepare-trpc-client";
import { TransactionTestHelper } from "@test/helpers/transactionTestHelper";
import { container } from "tsyringe";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test syllabusRouter.getAll", async () => {
  const client = await prepareTrpcClient({ env });
  const db = container.resolve<DrizzleClient>("DrizzleClient");
  const transactionHelper = new TransactionTestHelper(db);

  beforeEach(async () => {
    await transactionHelper.begin();
  });

  afterEach(async () => {
    await transactionHelper.rollback();
  });

  it("should retrieve all syllabuses", async () => {
    // arrange
    const expected = {
      name: "マシンラーニング実習",
      startTerm: 1,
      endTerm: 2,
      category: "実習",
      credits: "2",
      dayOfWeek: 3, // 月曜日
      period: 2,
      location: "米山キャンパスz",
      isCompulsory: false,
      description:
        "マシンラーニングの内容を踏まえ、商用分野におけるアプリケーションに、機械学習がどのように利用されているかを理解するとともに、本格的なAIアプリケーションに必要とされる大規模ニューラルネットワークの実装とその応用法を理解する。主に、大規模深層学習、音声認識、自然言語処理、その他AI活用などの実アプリケーションの実装を通し、自ら実行環境の設計・構築を行えるスキルを養成する。",
      learningObjectives:
        "１．商用分野におけるアプリケーションに機械学習がどのように利用されているか理解する。２．本格的なAIアプリケーションに必要とされる大規模ニューラルネットワークの実装とその応用法を理解する。３．より野心的で先進的な機械学習アプローチについて理解する。",
      version: "1.0",
      deletedAt: null,
    };
    await db.insert(Syllabus).values(expected);

    // act
    const res = await client.syllabusRouter.getAll();

    // assert
    expect(res).toContainEqual(expect.objectContaining(expected));
  });
});
