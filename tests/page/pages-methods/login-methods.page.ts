import {test, Page, TestInfo} from "@playwright/test";
import {PlaywrightFactory} from "../../utils/playwright-factory.utils";

export class LoginPageMethods {
  private readonly _page: Page;
  private readonly _testInfo: TestInfo;
  private readonly _playwrightFactory: PlaywrightFactory;
  private readonly _pageName: string;
  private readonly _url: string;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   */

  constructor(page: Page, testInfo: TestInfo) {
    this._page = page;
    this._testInfo = testInfo;
    this._playwrightFactory = new PlaywrightFactory(this._page, this._testInfo);
    this._pageName = "login-locators.page";
    this._url = "http://dev.account.business-in-a-box.com/login/?redirect=http%3A%2F%2Fdev.proj-mgmt.business-in-a-box.com";
  }

  public async goto(): Promise<void> {
    await test.step(`⏩ Go to ${this._url}`, async (): Promise<void> => {
      await this._page.goto(this._url);
    });
  }

  public async enterEmailAddress({username}): Promise<void> {
    await test.step(`⏩ Enter email address: ${username}`, async (): Promise<void> => {
      await this._playwrightFactory.sendKeys(this._pageName, "inputEmailAddress", username);
    });
  }

  public async verifyEmailAddress({username}): Promise<void> {
    await test.step(`🧪 Verify email address: ${username}`, async (): Promise<void> => {
      await this._playwrightFactory.verifyValue(this._pageName, "inputEmailAddress", username);
    });
  }

  public async enterPassword({password}): Promise<void> {
    await test.step(`⏩ Enter passwrod`, async (): Promise<void> => {});
    await this._playwrightFactory.sendKeys(this._pageName, "inputPassword", password);
  }

  public async verifyPassword({password}): Promise<void> {
    await test.step(`🧪 Verify password`, async (): Promise<void> => {
      await this._playwrightFactory.verifyValue(this._pageName, "inputPassword", password);
    });
  }

  public async clickButtonSignin(): Promise<void> {
    await test.step(`⏩ Click on Signin button`, async (): Promise<void> => {
      await this._playwrightFactory.click(this._pageName, "buttonSubmit");
    });
  }

  public async login({username, password}): Promise<void> {
    await test.step(`⏩ Login with email address: ${username}`, async (): Promise<void> => {
      await this.enterEmailAddress({username});
      await this.enterPassword({password});
      await this._playwrightFactory.embedFullPageScreenshot("Login - Screenshot");
      await this.clickButtonSignin();
    });
  }
}
