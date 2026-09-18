import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "..", "out");

// Simple static server simulating production static host
const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0];
  if (reqPath.endsWith("/")) reqPath += "index.html";
  else if (!path.extname(reqPath)) reqPath += "/index.html";

  const fullPath = path.join(outDir, reqPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(fullPath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(4055, async () => {
  console.log("Static preview server running on port 4055");

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

  console.log("\n--- ACTUAL STATIC HOST (out directory) WITHOUT REDIRECT RULES ---");
  for (const u of testUrls) {
    const res = await fetch(`http://localhost:4055${u}`, { redirect: "manual" });
    console.log(`URL: ${u.padEnd(42)} -> Status: ${res.status}, Type: ${res.headers.get("content-type")}`);
  }

  server.close();
  process.exit(0);
});
