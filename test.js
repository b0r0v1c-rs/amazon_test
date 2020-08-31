const {webkit, chromium} = require('playwright');
const assert = require('assert');

(async () => {
  for (const browserType of [webkit, chromium]) {
    const browser = await browserType.launch({
      headless: false, slowMo:30, /*Slows down Playwright operations by the specified amount of milliseconds*/
    });
    const page = await browser.newPage();

    // set the size of the browser window
    await page.setViewportSize({width: 1440, height: 900});

    // steps
    await page.goto("https://www.google.com");
    await page.click(".gLFyf");
    await page.type(".gLFyf", 'amazon');
    await page.click(".gNO89b");
 
  
    // Assert href attribute
    const attrOfResult = await page.getAttribute('div:nth-child(1) > div > div > div.r > a', 'href');
    assert(attrOfResult === "https://www.amazon.com/");

    // Assert text content
    const contentOfResult = await page.textContent('div > div > div.r > a > h3');
    assert(contentOfResult === 'Amazon.com: Online Shopping for Electronics, Apparel ...');
          
    // take the screenshot bwefore close the browser  
    await page.screenshot({
      path: `screenshot-${browserType.name()}.png`,
    });

    // take the screenshot bwefore close the browser  
    await browser.close();
    console.log('success: ' + browserType.name());
  }
})();
