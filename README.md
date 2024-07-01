# Playwright Automation Framework

## Dependencies used

- Playwright
- Casual
- fs

## Tutorial to run the project

### Prerequisites

#### Node.js

1. You need must have [Node.js](https://nodejs.org/en/) installed (Node.js LTS version recommended)
2. When you are installing Node.js, make sure to check the option

   - [x] **Automatically install the necesary tools. Note that this will also install Chocolatey. The script will pop-up in a new window after the installation completes.**

![nodeInstall](https://user-images.githubusercontent.com/60171460/157139770-d00bb969-9b36-4179-9dd2-ec5bf3fbd89a.PNG)

#### Browsers

Installed:

- Chrome
- Firefox
- MicrofoftEdge
- Safari/ Webkit

#### Visual Studio Code

You must have [Visual Studio Code](https://code.visualstudio.com/download) installed

## Download and open project

### Workaround 1

#### Download project

1. Click on the code button in this repository
2. Select the Download Zip option
3. Extract the .zip file with the **Extract here** option
4. Place the project folder on the desired location

#### Open project

- **<u>First way</u>:** Right click on the folder and open it with Visual Studio Code
- **<u>Second way</u>:** Open Visual Studio code and drag the folder in Visual Studio Code Window
- **<u>Third way</u>:** Open Visual Studio, on top bar, click File and Open Folder or press `Ctrl+K Ctrl+O`, then choose the folder where you save it

### Workaround 2 - Gitbash

1. Select the folder when you would like clone the project
2. Open gitbash and paste the following command

```bash
git clone https://github.com/Diegocortes15/playwright-automation-framework-TDD.git
```

## Running project

- In Visual Studio Code, open new terminal with `` Ctrl+Shift+` `` or `Ctrl+Shift+ñ` or on top bar click **Terminal**, then click **New Terminal**

- Type `npm install` and wait all packages will be downloaded

```bash
npm install
```

### How to Run test cases 🧪

---

#### Run test cases by regression suite 🌀

```bash
npx playwright test -g "@regression"
```

---

#### Run test cases by test case 📘

📘 Test case L-0001-HR-admin-login

```bash
npx playwright test -g "@L-0001-HR-admin-login"
```


---

### How open Playwright report 🎭

```bash
npx playwright show-report
```
