import fs from "node:fs";
import { createObjectCsvWriter } from "csv-writer";
import { parse } from "papaparse";
import { z } from "zod";

const CSV_FILE_PATH = "./packages/syllabus-scraper/data/syllabus_info.csv";

const CsvSchema = z.object({
  name: z.string(),
  term: z.string(),
  category: z.string(),
  credits: z.string(),
  dayOfWeek: z.string(),
  period: z.string(),
  location: z.string(),
  isCompulsory: z.string(),
  description: z.string(),
  learningObjectives: z.string(),
});

const CsvSchemaList = z.array(CsvSchema);

type DbSchema = {
  name: string;
  startTerm: number;
  endTerm: number;
  category: string;
  credits: string;
  dayOfWeek: number | null;
  period: number | null;
  location: string;
  isCompulsory: boolean;
  description: string;
  learningObjectives: string;
  version: string;
};

const convertDbSchema = (data: z.infer<typeof CsvSchema>): DbSchema => {
  // term
  let startTerm: number;
  let endTerm: number;
  const hankakuTerm = data.term.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
  if (hankakuTerm.includes("通年")) {
    startTerm = 1;
    endTerm = 4;
  } else {
    // 1期2期の表記から数字を抽出（全角→半角変換済み）
    const termMatches = hankakuTerm.match(/\d+/g);
    if (!termMatches) throw new Error(`Invalid term format: ${data.term}`);

    const termNumbers = termMatches.map((v) => Number.parseInt(v, 10));
    startTerm = Math.min(...termNumbers);
    endTerm = Math.max(...termNumbers);
  }

  // dayOfWeek
  const dayOfWeekDict: { [key: string]: number } = {
    月曜日: 1,
    火曜日: 2,
    水曜日: 3,
    木曜日: 4,
    金曜日: 5,
    土曜日: 6,
    日曜日: 7,
  };
  const dayOfWeek = dayOfWeekDict[data.dayOfWeek.trim()];

  // period
  // *時限から数字を抽出
  const hankakuPeriod = data.period.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
  const periodMatch = hankakuPeriod.match(/(\d+)時限/);
  let period: number | null;
  if (!periodMatch || !periodMatch[1]) {
    period = null;
  } else {
    period = Number.parseInt(periodMatch[1], 10);
  }

  return {
    name: data.name.trim(),
    startTerm: startTerm,
    endTerm: endTerm,
    category: data.category.trim(),
    credits: data.credits.trim(),
    dayOfWeek: dayOfWeek ?? null,
    period: period,
    location: data.location.trim(),
    isCompulsory: data.isCompulsory.trim() === "必修",
    description: data.description.trim(),
    learningObjectives: data.learningObjectives.trim(),
    version: "1.0.0",
  };
};

async function main() {
  // read csv
  const csvFile = fs.readFileSync(CSV_FILE_PATH, "utf-8");
  const { data } = parse<{ [key: string]: string }>(csvFile, { header: true });

  // 空行（全ての値が空文字）の除外
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) => typeof value === "string" && value.trim() !== ""),
  );

  // pease CSV data
  const safePersedData = CsvSchemaList.safeParse(filteredData);
  if (!safePersedData.success) {
    console.error("CSV data parsing failed:", safePersedData.error);
    return;
  }

  // convert to DB schema
  const dbReadyData = safePersedData.data.map((data) => {
    return convertDbSchema(data);
  });

  // write to CSV
  const csvFilePath = "./packages/syllabus-scraper/data/syllabus_db_ready.csv";
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: [
      { id: "name", title: "name" },
      { id: "startTerm", title: "startTerm" },
      { id: "endTerm", title: "endTerm" },
      { id: "category", title: "category" },
      { id: "credits", title: "credits" },
      { id: "dayOfWeek", title: "dayOfWeek" },
      { id: "period", title: "period" },
      { id: "location", title: "location" },
      { id: "isCompulsory", title: "isCompulsory" },
      { id: "description", title: "description" },
      { id: "learningObjectives", title: "learningObjectives" },
      { id: "version", title: "version" },
    ],
  });
  await csvWriter.writeRecords(dbReadyData);
}

main();
