import {test, expect, Page, TestInfo, Locator} from "@playwright/test";
import {readFileSync} from "fs";

export class PlaywrightFactory {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
  }

  public async getElement(filePath: string, elementName: string): Promise<any> {
    const rawdata: any = readFileSync(`./tests/page/pages-objects/${filePath}.json`);
    const data: any = JSON.parse(rawdata);
    return data.locators[elementName];
  }

  public async getElementSelector(filePath: string, elementName: string): Promise<Locator> {
    const rawdata: any = readFileSync(`./tests/page/pages-objects/${filePath}.json`);
    const data: any = JSON.parse(rawdata);
    return this._page.locator(data.locators[elementName].selector);
  }

  public async click(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is clicked`, async (): Promise<void> => {
      await this._page.locator(element.selector).scrollIntoViewIfNeeded();
      await this._page.click(element.selector);
      await this._testInfo.attach(`🐾 "${element.description}" is clicked`, {
        body: `🐾 "${element.description}" is clicked`,
        contentType: "text/plain",
      });
    });
  }

  public async sendKeys(filePath: string, elementName: string, strValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is entered with "${strValue}"`, async (): Promise<void> => {
      await this._page.locator(element.selector).scrollIntoViewIfNeeded();
      await this._page.fill(element.selector, strValue);
      await this._testInfo.attach(`🐾 "${element.description}" is entered with "${strValue}"`, {
        body: `🐾 "${element.description}" is entered with "${strValue}"`,
        contentType: "text/plain",
      });
    });
  }

  public async pressKey(filePath: string, elementName: string, strValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is pressed with "${strValue}"`, async (): Promise<void> => {
      await this._page.locator(element.selector).scrollIntoViewIfNeeded();
      await this._page.press(element.selector, strValue);
      await this._testInfo.attach(`🐾 "${element.description}" is pressed with "${strValue}"`, {
        body: `🐾 "${element.description}" is pressed with "${strValue}"`,
        contentType: "text/plain",
      });
    });
  }


  public async clearText(filePath: string, elementName: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🐾 "${element.description}" is erased`, async (): Promise<void> => {
      await this.click(filePath, elementName);
      await this.pressKey(filePath, elementName, "Control+A");
      await this.pressKey(filePath, elementName, "Backspace");
      await this.click(filePath, elementName);
    });
  }

  public async waitForDomLoad() {
    await this._page.waitForLoadState("domcontentloaded");
  }

  public async waitForNetworkIdle() {
    await this._page.waitForLoadState("networkidle");
  }

  public async embedFullPageScreenshot(description: string): Promise<void> {
    await test.step(`📸 "${description} - Full page screenshot`.trim(), async (): Promise<void> => {
      const screenshot: Buffer = await this._page.screenshot({fullPage: true});
      await this._testInfo.attach(`📸 ${description}`, {
        body: screenshot,
        contentType: "image/jpg",
      });
    });
  }

  public async verifyValue(filePath: string, elementName: string, strExpectedValue: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" value is displayed as expected`, async (): Promise<void> => {
      const actualValue: string = await this._page.inputValue(element.selector);
      if (actualValue == strExpectedValue) {
        await this.embedFullPageScreenshot(
          `✅ "${element.description}" value is displayed as Expected = "${strExpectedValue}" ; Actual = "${actualValue}" - Screenshot`
        );
        await this._testInfo.attach(
          `✅ "${element.description}" value is displayed as Expected = "${strExpectedValue}" ; Actual = "${actualValue}"`,
          {
            body: `✅ "${element.description}" value is displayed as expected = "${strExpectedValue}" ; actual = "${actualValue}"`,
            contentType: "text/plain",
          }
        );
      } else {
        await this.embedFullPageScreenshot(
          `💥 "${element.description}" value is NOT displayed. Expected = "${strExpectedValue}" ; Actual = "${actualValue}" - Screenshot`
        );
        await this._testInfo.attach(
          `💥 "${element.description}" value is NOT displayed. Expected = "${strExpectedValue}" ; Actual = "${actualValue}"`,
          {
            body: `💥 "${element.description}" value is NOT displayed as expected = "${strExpectedValue}" ; actual = "${actualValue}"`,
            contentType: "text/plain",
          }
        );
      }
      await expect.soft(this._page.locator(element.selector)).toHaveValue(strExpectedValue);
    });
  }

  public async getText(filePath: string, elementName: string): Promise<string | null> {
    const element: any = await this.getElement(filePath, elementName);
    const elementTextContent = await test.step(`🐾 "${element.description}" text is obtained`, async (): Promise<
      string | null
    > => {
      return this._page.locator(element.selector).textContent();
    });
    return elementTextContent;
  }

  public async verifyText(filePath: string, elementName: string, strExpectedText: string): Promise<void> {
    const element: any = await this.getElement(filePath, elementName);
    await test.step(`🧪 Verifying if "${element.description}" text is displayed as expected`, async (): Promise<void> => {
      const actualText: string | null = await this.getText(filePath, elementName);
      if (actualText?.includes(strExpectedText)) {
        await this.embedFullPageScreenshot(
          `✅ "${element.description}" text is displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}" - Screenshot`
        );
        await this._testInfo.attach(
          `✅ "${element.description}" text is displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}"`,
          {
            body: `✅ "${element.description}" text is displayed as expected = "${strExpectedText}" ; actual = "${actualText}"`,
            contentType: "text/plain",
          }
        );
      } else {
        await this.embedFullPageScreenshot(
          `💥 "${element.description}" text is NOT displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}" - Screenshot`
        );
        await this._testInfo.attach(
          `💥 "${element.description}" text is NOT displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}"`,
          {
            body: `💥 "${element.description}" text is NOT displayed as Expected = "${strExpectedText}" ; Actual = "${actualText}"`,
            contentType: "text/plain",
          }
        );
      }
      expect.soft(this._page.locator(element.selector)).toContainText(strExpectedText);
    });
  }
}
