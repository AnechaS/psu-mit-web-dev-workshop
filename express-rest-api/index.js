const http = require('http');
const app = require('./app');
const config = require('./config');

const port = config.port || 3000;

app.set('port', port);

const server = http.createServer(app);
server.listen(port, function() {
  console.log('Listening on port ' + port);
});