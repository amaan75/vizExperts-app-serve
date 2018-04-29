'use strict';

//import WebSocket from 'uws';
var WebSocket = require('uws');

var ws = new WebSocket('ws://localhost:3000/');

ws.on('open', function () {
  console.log('Connected to sevrer');
  ws.send('this is amaanullah client');
});
//# sourceMappingURL=client.js.map