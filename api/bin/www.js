const http = require('http');
const app = require('./../app'); // The express app we just created

const port = 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);