const express = require("express");
const app = express();

const PORT = process.env.PORT || 3002;
let counter = 0;

app.get("/pingpong", (req, res) => {
  counter++;
  res.send(`pong ${counter}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
