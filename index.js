import puppeteer from 'puppeteer';
import config from './constants/config.js';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch(config);

  const page = await browser.newPage();
  await page.goto('https://scores24.live/ru/table-tennis');
  await page.setViewport({ width: 1920, height: 1080 });

  await page.waitForSelector('._close_uc2rw_43');
  await page.click('._close_uc2rw_43');

  // let lol;

  const dayStat = await page.evaluate(() => {
    const result = [];
    const matches = document.querySelectorAll('.sc-q2a52n-2');
    Object.values(matches)
      .map((match) => {
        const lines = [...match.children];
        const sets = [];
        lines.map((line, index) => {
          const spans = [...line.querySelectorAll('span')];

          let amountOfSets;

          for (let i = 0; i < spans.length; i++) {
            if (spans[i].textContent === '') {
              amountOfSets = i;
              break;
            }
          }

          for (let i = 0; i < amountOfSets; i++) {
            if (amountOfSets > 0) {
              if (sets.length === amountOfSets) {
                sets[i].push(+spans[i].textContent);
              } else {
                sets.push([+spans[i].textContent]);
              }
            }
          }
        });
        result.push(sets);
      });
      return result;
    });

    fs.writeFileSync('./dayStat.txt', JSON.stringify(dayStat));
  })();
  