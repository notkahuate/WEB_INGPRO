require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { sincronizarEstados } = require("./controllers/CotizacionController");

const LOCK_PATH = path.join(__dirname, ".cron-sync.lock");
const MAX_MS = Number(process.env.CRON_TIMEOUT_MS || 90000);
const STALE_MS = 2 * 60 * 1000;

function tryLock() {
  try {
    fs.writeFileSync(LOCK_PATH, String(process.pid), { flag: "wx" });
    return true;
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
    try {
      const age = Date.now() - fs.statSync(LOCK_PATH).mtimeMs;
      if (age > STALE_MS) {
        fs.unlinkSync(LOCK_PATH);
        fs.writeFileSync(LOCK_PATH, String(process.pid), { flag: "wx" });
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }
}

function releaseLock() {
  try {
    fs.unlinkSync(LOCK_PATH);
  } catch {
    /* ignore */
  }
}

(async () => {
  if (!tryLock()) {
    console.log("⏭ CRON ya en ejecución, se omite esta pasada.");
    process.exit(0);
  }

  const killer = setTimeout(() => {
    console.error("❌ CRON superó el tiempo máximo, se cierra para no acumular procesos.");
    releaseLock();
    process.exit(1);
  }, MAX_MS);

  console.log("⏳ Ejecutando CRON...");

  try {
    await sincronizarEstados();
    console.log("✅ Finalizó correctamente");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    clearTimeout(killer);
    releaseLock();
    process.exit(0);
  }
})();
