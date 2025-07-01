import type { BrowserContext } from "playwright";
import { sleep } from "./sleep";

export const getSyllabusInfoFromUrl = async (context: BrowserContext, url: string) => {
  const page = await context.newPage();

  // Go to the login page
  await page.goto(url);

  // wait
  await page.waitForLoadState("networkidle");
  await sleep(1000);

  // get syllabus info
  const name = await page.textContent("#lblKogiName");
  const term = await page.textContent("#lblKaikojiki");
  const category = await page.textContent("#lblKogiKubun");
  const credits = await page.textContent("#lblTanisu");
  const dayOfWeek = await page.textContent("#lblYobi");
  const period = await page.textContent("#lblJigen");
  const location = await page.textContent("#lblKochi");
  const isCompulsory = await page.textContent("#lblKamokuBunrui");
  const description = await page.textContent("#lblGakushuMokuhyo");
  const learningObjectives = await page.textContent("#lblJugyoGaiyo");

  // close page
  await page.close();

  return {
    name,
    term,
    category,
    credits,
    dayOfWeek,
    period,
    location,
    isCompulsory,
    description,
    learningObjectives,
  };
};
