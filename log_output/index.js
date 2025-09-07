const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const app = express();

// Random string is created once when the app starts
const randomString = crypto.randomBytes(16).toString("hex");
const PORT = process.env.PORT || 3001;
const FILE_DIR = "/usr/src/app/files";
const FILE_PATH = path.join(FILE_DIR, "pongs.txt");

// This route handler is executed for every GET to '/'
app.get("/", (req, res) => {
  // A new timestamp is created for each request
  const timestamp = new Date().toISOString();
  let pongCount = 0;

  // Try to read the pong count from the shared file
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    pongCount = parseInt(data) || 0;
  } catch (error) {
    console.log("Pong file not found, starting counter from 0");
  }

  const response = `${timestamp}: ${randomString}\nPing / Pongs: ${pongCount}`;
  res.type('text/plain').send(response);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
