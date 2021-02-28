const http = require('http');
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const cors = require('cors');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.status(200).json({ message: 'ok' });
});

const api = ParseServer({
    appId: config.appId,
    databaseURI: config.databaseURI,
    serverURL: config.serverURL,
    cloud: __dirname + '/cloud/main.js',
    masterKey: config.masterKey,
    restAPIKey: config.restAPIKey
});

app.use('/parse', api);

const server = http.createServer(app);
server.listen(config.port, function () {
    console.log('Listening on port ' + 1337);
});

// Live Query Server
// ParseServer.createLiveQueryServer(server);