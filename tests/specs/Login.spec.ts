import {test} from "@playwright/test";
import {LoginPageMethods} from "../page/pages-methods/login-methods.page";
import {ProjectsPageMethods} from "../page/pages-methods/projects-methods.page";
import {SupportFactory} from "../utils/support-factory.utils";
import {readFileSync} from "fs";

const storyParentId = "Login";

const testDataTestCase_1 = JSON.parse(readFileSync(`./tests/data/${storyParentId}/L-0001-HR-admin-login.json`, "utf-8"));
test(`Test case: ${testDataTestCase_1["testCase"]} |
Description: ${testDataTestCase_1["testDescription"]} |
Tags: ${testDataTestCase_1["tags"]}`, async ({page}) => {
  
  const data = await testDataTestCase_1;
  const loginPageMethods = new LoginPageMethods(page, test.info());
  const projectsPageMethods = new ProjectsPageMethods(page, test.info());
  const supportFactory = new SupportFactory(page, test.info());

  await supportFactory.addAnnotations(data);
  
  await loginPageMethods.goto();
  await loginPageMethods.enterEmailAddress(data.loginPage);
  await loginPageMethods.enterPassword(data.loginPage);
  await loginPageMethods.verifyEmailAddress(data.loginPage);
  await loginPageMethods.verifyPassword(data.loginPage);
  await loginPageMethods.clickButtonSignin();
  
  await projectsPageMethods.verifyMyTasksPage(data.projectsPage);
});