const express = require('express');
const crypto = require('crypto');
const app = express();

// Random string is created once when the app starts
const randomString = crypto.randomBytes(16).toString('hex');
const PORT = process.env.PORT || 3001;

// This route handler is executed for every GET to '/'
app.get('/', (req, res) => {
    // A new timestamp is created for each request
    const timestamp = new Date().toISOString();
    const response = `${timestamp} - ${randomString}`;
    console.log('Sending response:', response);
    res.send(response);
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

