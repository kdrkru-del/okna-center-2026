import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const appDir = path.join(rootDir, "src", "app");

const EXPECTED_REDIRECTS = [
  { source: "undefined", target: "/" },
  { source: "okna", target: "/kupit_plastikovye_okna_vladivostok" },
  { source: "balkon_pod_klyuch_vladivostok", target: "/osteklenie_balkona_vladivostok" },
  { source: "lodzhii", target: "/lodgia_pod_klyuch_vladivostok" },
  { source: "osteklenie_lodgiy_vladivostok", target: "/lodgia_pod_klyuch_vladivostok" },
  { source: "plastikovie_okna_vo_vladivostoke", target: "/kupit_plastikovye_okna_vladivostok" },
  { source: "plastikovie_okna_vo_vladivostoke_2_2", target: "/kupit_plastikovye_okna_vladivostok" },
  { source: "stienovyie_panieli_mdf", target: "/otdielochnyie_matierialy" },
  { source: "osteklenie_balkona", target: "/osteklenie_balkona_vladivostok" },
  { source: "remont_plastikovyh_okon_vladivostok_2", target: "/remont_plastikovyh_okon_vladivostok" }
];

console.log("==================================================");
console.log("🔍 ПРОВЕРКА 301 РЕДИРЕКТОВ (10 СТАРЫХ МАРШРУТОВ)");
console.log("==================================================");

let passedCount = 0;
const results = [];

for (const red of EXPECTED_REDIRECTS) {
  const pagePath = path.join(appDir, red.source, "page.tsx");
  if (!fs.existsSync(pagePath)) {
    console.error(`❌ [FAIL] Файл не найден: ${pagePath}`);
    results.push({ ...red, status: "MISSING_FILE", pass: false });
    continue;
  }

  const content = fs.readFileSync(pagePath, "utf-8");
  const hasPermanentRedirect = content.includes("permanentRedirect");
  const hasTarget = content.includes(`permanentRedirect("${red.target}")`) || content.includes(`permanentRedirect('${red.target}')`);

  if (hasPermanentRedirect && hasTarget) {
    console.log(`✅ [PASS] /${red.source} -> ${red.target} (301 permanentRedirect)`);
    results.push({ ...red, status: "OK", pass: true });
    passedCount++;
  } else {
    console.error(`❌ [FAIL] /${red.source}: Неверный таргет в ${pagePath}`);
    results.push({ ...red, status: "INVALID_TARGET", pass: false });
  }
}

console.log("--------------------------------------------------");
console.log(`ИТОГ РЕДИРЕКТОВ: ${passedCount} из ${EXPECTED_REDIRECTS.length} УСПЕШНО`);
console.log("==================================================");

if (passedCount === EXPECTED_REDIRECTS.length) {
  process.exit(0);
} else {
  process.exit(1);
}
