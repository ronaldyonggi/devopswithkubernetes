function generateRandomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

setInterval(() => {
  const timestamp = new Date().toISOString();
  const randomString = generateRandomString();
  console.log(`${timestamp}: ${randomString}`);
}, 5000);
