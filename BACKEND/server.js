const http = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = http.createServer(
    {
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    },app );



server.listen(port)