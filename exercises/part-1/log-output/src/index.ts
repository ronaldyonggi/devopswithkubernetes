import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

let logOutput = '';

function generateRandomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

setInterval(() => {
  const timestamp = new Date().toISOString();
  const randomString = generateRandomString();
  logOutput = `[${timestamp}] ${randomString}`;
}, 5000);

app.get('/', (_req, res) => {
  res.send({
    logOutput,
  });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
