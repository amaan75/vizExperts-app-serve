'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _package = require('../package.json');

var _uws = require('uws');

var _uws2 = _interopRequireDefault(_uws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 3000;
var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.use((0, _morgan2.default)('dev'));

app.use((0, _cors2.default)({
  exposedHeaders: "*"
}));

app.use(_bodyParser2.default.json({
  limit: '50mb'
}));

app.use(function (req, res) {
  res.json({
    version: _package.version
  });
});

app.wss = new _uws.Server({

  server: app.server
});

app.wss.on('connection', function (ws) {
  console.log('New client connect');

  //listen for new message from client

  ws.on('message', function (message) {
    console.log('new message from client:' + message);
  });
});

app.server.listen(process.env.PORT || PORT, function () {
  console.log('App is running on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map