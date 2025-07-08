import { createObjectCsvWriter } from "csv-writer";
import { type Page, chromium } from "playwright";
import { login } from "../utils/login";
import { sleep } from "../utils/sleep";

type SyllabusRecord = {
  syllabusUrl: string;
};

const extractSyllabusUrlFromPage = async (page: Page): Promise<SyllabusRecord[]> => {
  const syllabusUrlList: SyllabusRecord[] = [];

  // Get all input[type=submit] elements whose name attribute matches DKogiGrid$ctlXX$SelectButton
  const buttons = await page.$$(
    `input[type="submit"][name^="DKogiGrid$ctl"][name$="$SelectButton"]`,
  );

  for (const btn of buttons) {
    const onclick = await btn.getAttribute("onclick");
    if (onclick) {
      const match = onclick.match(/window\.open\(['"]([^'"]+)['"]/);
      if (match) {
        const url = match[1];
        syllabusUrlList.push({ syllabusUrl: `https://portal.kaishi-pu.ac.jp${url}` });
      }
    }
  }

  return syllabusUrlList;
};

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // login
  await login(context);

  // Got to Syllabus search page
  await page.goto(
    "https://portal.kaishi-pu.ac.jp/Gakusei/web/Syllabus/WebSyllabusKensaku/UI/WSL_SyllabusKensaku.aspx",
  );

  // search
  await page.getByRole("button", { name: "以上の条件で検索" }).click();

  // wait
  await page.waitForLoadState("networkidle");
  await sleep(1000);

  // syllabus list
  const syllabusUrlList: SyllabusRecord[] = [];

  syllabusUrlList.push(...(await extractSyllabusUrlFromPage(page)));

  for (let i = 0; i < 5; i++) {
    await page.getByRole("link", { name: "次ページ＞" }).first().click();

    // wait
    await page.waitForLoadState("networkidle");
    await sleep(3000);

    syllabusUrlList.push(...(await extractSyllabusUrlFromPage(page)));
  }

  // close browser
  await browser.close();

  // write to CSV
  const csvFilePath = "../data/syllabus_urls.csv";
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: [{ id: "syllabusUrl", title: "syllabus-url" }],
  });
  await csvWriter.writeRecords(syllabusUrlList);
}

main();
