const express = require('express');
const app = express();
const cors = require('cors');

const server = require('http').Server(app);
const io = require('socket.io')(server);

require('./db');

io.on('connection', socket => {

});

app.use(express.json());
app.use(cors());
app.use(require('./routes'));
server.listen(3333);
