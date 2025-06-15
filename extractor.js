const fs = require('fs');
const { chromium } = require('playwright');

const urls = [
  'https://stream196tp.com/global2.php?stream=espn',
  'https://stream196tp.com/global2.php?stream=espn2',
  'https://stream196tp.com/global2.php?stream=espn3',
  'https://stream196tp.com/global1.php?stream=espn4',
  'https://stream196tp.com/global2.php?stream=espn5',
  'https://stream196tp.com/global2.php?stream=espn6',
  'https://stream196tp.com/global2.php?stream=espn7',
  'https://stream196tp.com/global2.php?stream=winplus',
  'https://stream196tp.com/global2.php?stream=winplus2',
  'https://stream196tp.com/global2.php?stream=winsports',
  'https://stream196tp.com/global2.php?stream=winplusonline1',
  'https://stream196tp.com/global2.php?stream=fox1ar',
  'https://stream196tp.com/global2.php?stream=fox2ar',
  'https://stream196tp.com/global2.php?stream=fox3ar',
  'https://stream196tp.com/global2.php?stream=dsports',
  'https://stream196tp.com/global2.php?stream=dsports2',
  'https://stream196tp.com/global2.php?stream=dsportsplus',
  'https://stream196tp.com/global2.php?stream=tntsportschile',
  'https://stream196tp.com/global2.php?stream=tntsports',
  'https://stream196tp.com/global2.php?stream=espnpremium',
  'https://stream196tp.com/global2.php?stream=tycsports',
  'https://stream196tp.com/global2.php?stream=telefe',
  'https://stream196tp.com/global2.php?stream=tv_publica',
  'https://stream196tp.com/global2.php?stream=liga1max',
  'https://stream196tp.com/global2.php?stream=goltv',
  'https://stream196tp.com/global2.php?stream=vtvplus',
  'https://stream196tp.com/global2.php?stream=golperu',
  'https://stream196tp.com/global2.php?stream=espndeportes',
  'https://stream196tp.com/global2.php?stream=tudn_usa',
  'https://stream196tp.com/global2.php?stream=fox_1_usa',
  'https://stream196tp.com/global2.php?stream=fox_2_usa',
  'https://stream196tp.com/global2.php?stream=universo_usa',
  'https://stream196tp.com/global2.php?stream=univision_usa',
  'https://stream196tp.com/global2.php?stream=disney1',
  'https://stream196tp.com/global2.php?stream=disney2',
  'https://stream196tp.com/global2.php?stream=disney3',
  'https://stream196tp.com/global2.php?stream=disney4',
  'https://stream196tp.com/global2.php?stream=disney5',  
  'https://stream196tp.com/global2.php?stream=disney6',
  'https://stream196tp.com/global2.php?stream=disney7',
  'https://stream196tp.com/global2.php?stream=disney8',
  'https://stream196tp.com/global2.php?stream=disney9',
  'https://stream196tp.com/global2.php?stream=disney10',
  'https://stream196tp.com/global2.php?stream=disney11',
  'https://stream196tp.com/global2.php?stream=disney12',
  'https://stream196tp.com/global2.php?stream=disney13',
  'https://stream196tp.com/global2.php?stream=disney14',
  'https://stream196tp.com/global2.php?stream=disney15',
  'https://stream196tp.com/global2.php?stream=disney16',
  'https://stream196tp.com/global2.php?stream=disney17',
  'https://stream196tp.com/global2.php?stream=disney18',
  'https://stream196tp.com/global2.php?stream=disney19'
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
