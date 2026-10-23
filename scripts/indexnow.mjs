/**
 * Tells Bing (and Yandex, Seznam, Naver) about every URL in the live
 * sitemap via IndexNow, so new products and posts get crawled in hours
 * instead of weeks. Bing's index also feeds ChatGPT search and Copilot.
 *
 * Run after a production deploy that adds or changes pages:
 *   npm run seo:indexnow
 *
 * The key file public/15cbeb1189ac9269f55674082de9f0a1.txt proves we own nooni.dk. If the key
 * ever changes, rename that file and update KEY below.
 */

const HOST = "nooni.dk";
const KEY = "15cbeb1189ac9269f55674082de9f0a1";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const keyRes = await fetch(KEY_LOCATION);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`indexnow: ${KEY_LOCATION} is not live yet. Deploy first.`);
  process.exit(1);
}

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

console.log(`indexnow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
