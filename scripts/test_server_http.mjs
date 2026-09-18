import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");

// Parse _redirects file
const redirectsFile = path.join(rootDir, "public", "_redirects");
const rules = {};
fs.readFileSync(redirectsFile, "utf-8").split("\n").forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      rules[parts[0]] = { target: parts[1], status: parseInt(parts[2]) || 301 };
    }
  }
});

const server = http.createServer((req, res) => {
  const parsed = req.url.split("?")[0].replace(/\/$/, "");
  const rule = rules[parsed] || rules[req.url.split("?")[0]];

  if (rule) {
    res.writeHead(rule.status, { "Location": rule.target });
    res.end();
    return;
  }

  let reqPath = req.url.split("?")[0];
  if (reqPath.endsWith("/")) reqPath += "index.html";
  else if (!path.extname(reqPath)) reqPath += "/index.html";

  const fullPath = path.join(outDir, reqPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(fullPath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<html><body><h1>404 Not Found</h1></body></html>");
  }
});

server.listen(4066, async () => {
  console.log("==================================================");
  console.log("🌐 ФАКТИЧЕСКИЙ HTTP ТЕСТ С ПРАВИЛАМИ СЕРВЕРА (_redirects / Nginx)");
  console.log("==================================================");

  const testUrls = [
    "/undefined",
    "/okna",
    "/balkon_pod_klyuch_vladivostok",
    "/lodzhii",
    "/osteklenie_lodgiy_vladivostok",
    "/plastikovie_okna_vo_vladivostoke",
    "/plastikovie_okna_vo_vladivostoke_2_2",
    "/stienovyie_panieli_mdf",
    "/osteklenie_balkona",
    "/remont_plastikovyh_okon_vladivostok_2"
  ];

  for (const u of testUrls) {
    const res = await fetch(`http://localhost:4066${u}`, { redirect: "manual" });
    const location = res.headers.get("location");
    console.log(`SOURCE: ${u.padEnd(42)} | STATUS: ${res.status} | LOCATION: ${location}`);
  }

  // Also test a 404 URL
  const test404 = await fetch("http://localhost:4066/this-page-does-not-exist-12345", { redirect: "manual" });
  console.log(`\n404 TEST: /this-page-does-not-exist-12345 | STATUS: ${test404.status}`);

  server.close(() => {
    setTimeout(() => {
      process.exit(0);
    }, 100);
  });
});
