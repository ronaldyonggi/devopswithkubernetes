const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3002;

const FILE_DIR = "/usr/src/app/files";
const FILE_PATH = path.join(FILE_DIR, "pongs.txt");

// Ensure the directory exists
fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });

app.get("/pingpong", (req, res) => {
  let counter = 0;
  // Read the current count from the file
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    counter = parseInt(data) || 0;
  } catch(error) {
    console.log('Pong file not found, starting counter from 0');
  }

  counter++;

  // Write the new count back to the file
  fs.writeFileSync(FILE_PATH, counter.toString());
  res.send(`pong ${counter}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
