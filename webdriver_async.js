const webdriver = require("selenium-webdriver");
var assert = require('assert');
var until = webdriver.until;
var By = webdriver.By;
var util = require('util');

const title = 'Пассажиры (2016) смотреть онлайн бесплатно';

let enterLink = webdriver.By.linkText('Вход');
let loginField = By.name('login_name');
let passwordField = By.id('login_password');
let enterButton = webdriver.By.xpath('//button[contains(*, "Войти")]');
let searchForm = webdriver.By.css('input[name*=story]');
let okButton = webdriver.By.xpath('//button[contains(*, "ok")]');
let moveName = webdriver.By.css('a[href*="passazhiry"]');

function createDriver() {
  let driver = new webdriver.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
  driver.manage().timeouts().setScriptTimeout(10000);
  return driver;
}

let browser = createDriver();

browser.get('http://kinogo.club/');

browser.findElement(searchForm)
  .then((search) => {
    browser.wait(until.elementIsVisible(search))
      .then((visibleElement) => {
        return visibleElement.sendKeys('Пассажиры')
          .then(() => {
            return browser.findElement(okButton).click();
          })
      });
  })
browser.findElement(moveName)
  .then(move => {
    browser.wait(until.elementIsEnabled(move))
      .then((enableElement) => {
        return enableElement.click()
      })
  });

browser.getTitle().then(value => {
  return assert.equal(value, title);
});

browser.findElement(enterLink).click();
let login = browser.wait(until.elementLocated(loginField), 10000);
login.sendKeys('tanyaslavinskaya');
let password = browser.wait(until.elementLocated(passwordField), 10000);
password.sendKeys('tanya231195');

browser.findElement(enterButton)
  .then(enter => {
    browser.wait(until.elementIsVisible(enter))
      .then((isEnable) => {
        return isEnable.click();
      })
  });

browser.getAllWindowHandles().then((windowHandles) => {
  return assert.equal(windowHandles.length, 1, "Not equal");
});

browser.quit();



