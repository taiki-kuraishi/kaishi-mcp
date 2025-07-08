import type { BrowserContext } from "playwright";
import { sleep } from "./sleep";

const ID = "";
const PASSWORD = "";

export const login = async (context: BrowserContext) => {
  const page = await context.newPage();

  // Go to the login page
  await page.goto("https://portal.kaishi-pu.ac.jp/portal/Account/Login");

  // wait
  await page.waitForLoadState("networkidle");
  await sleep(1000);

  // login
  await page.getByRole("textbox", { name: "ログインID" }).click();
  await page.getByRole("textbox", { name: "ログインID" }).fill(ID);
  await page.getByRole("textbox", { name: "パスワード" }).click();
  await page.getByRole("textbox", { name: "パスワード" }).fill(PASSWORD);
  await page.getByRole("button", { name: "ログイン" }).click();

  // wait
  await page.waitForLoadState("networkidle");
  await sleep(1000);

  // Navigate to web services
  await page.getByRole("button", { name: "外部サービス" }).click();
  page.waitForEvent("popup");
  await page.getByRole("link", { name: "Webサービス" }).click();

  // wait
  await page.waitForLoadState("networkidle");
  await sleep(1000);

  // close page
  await page.close();
};
