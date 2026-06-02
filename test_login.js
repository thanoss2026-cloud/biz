const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Catch console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    // Open the local file
    await page.goto('file:///Users/orkanhaliloglu/Documents/Documents - orkan’s MacBook Air/GitHub/biz/admin.html');
    
    console.log('Page loaded. Evaluating handleLogin...');
    
    const isHandleLoginDefined = await page.evaluate(() => typeof handleLogin === 'function');
    console.log('isHandleLoginDefined:', isHandleLoginDefined);
    
    const isAuthDefined = await page.evaluate(() => typeof auth !== 'undefined' && auth !== null);
    console.log('isAuthDefined:', isAuthDefined);
    
    await browser.close();
})();
