import express from 'express';
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

let pong = 0;

app.get('/pingpong', (_req, res) => {
  res.send({
    pong,
  });

  pong++;
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
