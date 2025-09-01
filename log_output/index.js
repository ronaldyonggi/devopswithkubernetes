const crypto = require('crypto')
const randomString = crypto.randomBytes(16).toString('hex');

const logOutput = () => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${randomString}`);                      
}

console.log('Application starting...');
setInterval(logOutput, 5000);