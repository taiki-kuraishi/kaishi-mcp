import fs from "node:fs";
import { createObjectCsvWriter } from "csv-writer";
import { parse } from "papaparse";
import { chromium } from "playwright";
import { z } from "zod";
import { getSyllabusInfoFromUrl } from "../utils/get-syllabus-info-from-url";
import { login } from "../utils/login";

const CSV_FILE_PATH = "./packages/syllabus-scraper/data/syllabus_urls.csv";

const SyllabusUrlSchemaList = z.array(
  z.object({
    "syllabus-url": z.string().url(),
  }),
);

async function main() {
  const csvFile = fs.readFileSync(CSV_FILE_PATH, "utf-8");
  const { data } = parse<{ [key: string]: string }>(csvFile, { header: true });

  // 空行（全ての値が空文字）の除外
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) => typeof value === "string" && value.trim() !== ""),
  );

  // pease CSV data
  const safePersedData = SyllabusUrlSchemaList.safeParse(filteredData);
  if (!safePersedData.success) {
    console.error("CSV data parsing failed:", safePersedData.error);
    return;
  }

  // setup browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  // login
  await login(context);

  const syllabusInfoList = [];
  for (const record of safePersedData.data) {
    syllabusInfoList.push(await getSyllabusInfoFromUrl(context, record["syllabus-url"]));
  }

  // close browser
  await browser.close();

  // write to CSV
  const csvFilePath = "./packages/syllabus-scraper/data/syllabus_info.csv";
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: [
      { id: "name", title: "name" },
      { id: "term", title: "term" },
      { id: "category", title: "category" },
      { id: "credits", title: "credits" },
      { id: "dayOfWeek", title: "dayOfWeek" },
      { id: "period", title: "period" },
      { id: "location", title: "location" },
      { id: "isCompulsory", title: "isCompulsory" },
      { id: "description", title: "description" },
      { id: "learningObjectives", title: "learningObjectives" },
    ],
  });
  await csvWriter.writeRecords(syllabusInfoList);
}

main();
