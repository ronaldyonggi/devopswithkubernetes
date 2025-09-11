const express = require("express");
const crypto = require("crypto");
const app = express();

// Random string is created once when the app starts
const randomString = crypto.randomBytes(16).toString("hex");
const PORT = process.env.PORT || 3001;

const PING_PONG_URL = "http://ping-pong-svc:2347/pingpong";

// This route handler is executed for every GET to '/'
app.get("/", async (req, res) => {
  // A new timestamp is created for each request
  const timestamp = new Date().toISOString();
  let pongCount = 0;

  try {
    // Make the request to ping-pong service
    const response = await fetch(PING_PONG_URL);

    // Get the ext content from the response
    pongCount = await response.text();
  } catch (err) {
    console.error("Error fetching pongs:", err.message);
  }

  const responseString = `${timestamp}: ${randomString}\nPing / Pongs: ${pongCount}`;
  res.type("text/plain").send(responseString);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
