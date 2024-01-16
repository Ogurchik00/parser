const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://scores24.live/ru/table-tennis')
  await page.setViewport({width: 1920, height: 1080});
  // await page.waitForSelector('._close_uc2rw_43')
  // await page.click('._close_uc2rw_43')


  const matches = await page.evaluate(() => {
    let matchSets = document.querySelectorAll('.sc-q2a52n-3')
    let check = Object.values(matchSets).map((item) => item )
    console.log(check)
  })
  
  

}

)();
