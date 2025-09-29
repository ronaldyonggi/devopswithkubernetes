const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const app = express();

// Random string is created once when the app starts
const randomString = crypto.randomBytes(16).toString("hex");
const MESSAGE = process.env.MESSAGE;
const PORT = process.env.PORT || 3001;

const INFORMATION_FILE_PATH = path.join("/etc/config", "information.txt");

const PING_PONG_URL = process.env.PING_PONG_URL;

// This route handler is executed for every GET to '/'
app.get("/", async (req, res) => {
  // A new timestamp is created for each request
  const timestamp = new Date().toISOString();
  let pongCount = 0;

  let fileContent = "";

  // Check if the information file exists
  if (fs.existsSync(INFORMATION_FILE_PATH)) {
    fileContent = fs.readFileSync(INFORMATION_FILE_PATH, "utf-8");
  }

  try {
    // Make the request to ping-pong service
    const response = await fetch(PING_PONG_URL);

    // Get the ext content from the response
    pongCount = await response.text();
  } catch (err) {
    console.error("Error fetching pongs:", err.message);
  }

  const responseString = `
  file content: ${fileContent}\n
  env variable: MESSAGE=${MESSAGE}\n
  ${timestamp}: ${randomString}\n
  Ping / Pongs: ${pongCount}`;
  res.type("text/plain").send(responseString);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
