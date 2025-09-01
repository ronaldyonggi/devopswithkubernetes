const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.port || 3001;

// Full path of the log file
const LOG_FILE_PATH = path.join("/usr/src/app/files", "logs.txt");

app.get("/", (req, res) => {
  // Check if the log file exists before trying to read
  if (fs.existsSync(LOG_FILE_PATH)) {
    const logs = fs.readFileSync(LOG_FILE_PATH, "utf-8");
    // Send the content as plain text
    res.type("text/plain").send(logs);
  } else {
    res.status(404).send("Log file not found. Please wait and refresh");
  }
});

app.listen(PORT, () => {
  console.log(`Reader server started on port ${PORT}`);
})
