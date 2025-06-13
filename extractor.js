const fs = require('fs');
const { chromium } = require('playwright');

const urls = [
  'https://stream196tp.com/global2.php?stream=espn',
  'https://stream196tp.com/global2.php?stream=espn2',
  'https://stream196tp.com/global2.php?stream=espn3'
];

async function extraerM3U8(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let m3u8 = null;

  const canal = new URL(url).searchParams.get('stream');

  page.on('response', async (res) => {
    const resUrl = res.url();
    if (resUrl.includes('.m3u8') && !m3u8) {
      m3u8 = resUrl;
    }
  });

  try {
    console.log(`🔍 Extrayendo ${canal}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(10000);

    if (!m3u8) throw new Error('No se encontró .m3u8');

    fs.writeFileSync(`enlaces/${canal}.txt`, m3u8);
    console.log(`✅ ${canal}: ${m3u8}`);
  } catch (err) {
    console.error(`❌ ${canal}: ${err.message}`);
  } finally {
    await browser.close();
  }
}

(async () => {
  for (const url of urls) {
    await extraerM3U8(url);
  }
})();
