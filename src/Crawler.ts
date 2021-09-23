import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

const waitAndClick = async (driver: WebDriver, elementBy: By) => {
  const ele = await driver.wait(until.elementLocated(elementBy));
  await ele.click();
};

const getCalendarTable = async (account: string, password: string) => {
  let tableHTML = "";
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();

  try {
    await driver.get("https://ais.ntou.edu.tw/Default.aspx");
    await driver.findElement(By.id("M_PORTAL_LOGIN_ACNT")).sendKeys(account);
    await driver.findElement(By.id("M_PW")).sendKeys(password, Key.ENTER);
    await driver.wait(until.urlIs("https://ais.ntou.edu.tw/MainFrame.aspx"));
    await driver
      .switchTo()
      .frame(await driver.findElement(By.name("menuFrame")));
    await waitAndClick(driver, By.css("a[title='教務系統']"));
    await waitAndClick(driver, By.css("a[title='選課系統']"));
    await waitAndClick(driver, By.css("a[title='學生個人選課清單課表列印']"));

    await driver.switchTo().defaultContent();
    await driver
      .switchTo()
      .frame(await driver.findElement(By.name("mainFrame")));

    await waitAndClick(driver, By.id("QUERY_BTN3"));

    const classTable = await driver.wait(until.elementLocated(By.id("table2")));
    tableHTML = await classTable.getAttribute("innerHTML");
  } catch (error) {
    console.error(error);
  } finally {
    await driver.quit();
  }
  return tableHTML;
};

export { getCalendarTable };
