import express from 'express';
const app = express();
app.use(express.json());

const simplePageHtml = `<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
`

app.get('/', (_req, res) => {
  res.send(simplePageHtml);
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
