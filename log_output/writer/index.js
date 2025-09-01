const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// The directory where logs will be stored
const LOG_DIR = "/usr/src/app/files";
// The full path of the log file
const LOG_FILE_PATH = path.join(LOG_DIR, "logs.txt");

// Ensure log directory exists
fs.mkdirSync(LOG_DIR, { recursive: true });

// Random string is created once when the app starts
const randomString = crypto.randomBytes(16).toString("hex");

const writeLog = () => {
  const timestamp = new Date().toISOString();
  const logLine = `${timestamp}: ${randomString}\n`; // Add a newline character

  fs.appendFileSync(LOG_FILE_PATH, logLine);
  console.log(`Wrote: ${logLine.trim()}`);
};

setInterval(writeLog, 5000);
