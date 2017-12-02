'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _error_handler = require('./middlewares/errors/error_handler');

var _error_handler2 = _interopRequireDefault(_error_handler);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes3 = require('./admin/routes');

var _routes4 = _interopRequireDefault(_routes3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localStrategy = require('passport-local').Strategy; // Core


// Utils


var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// middlewares
// -> parse application/json
app.use(_bodyParser2.default.json({
    limit: _config2.default.bodyLimit
}));

app.use((0, _expressValidator2.default)());
app.use((0, _cors2.default)());

// passport config
app.use(_passport2.default.initialize());
var Account = require('./models/users/account');
_passport2.default.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, Account.authenticate()));
_passport2.default.serializeUser(Account.serializeUser());
_passport2.default.deserializeUser(Account.deserializeUser());

app.use(_express2.default.static('public'));

// API ROUTES ADMIN
app.use('/admin', _routes4.default);

// API ROUTES V1
app.use('/v1', _routes2.default);

app.use('/', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Real world! I am the the GG Web Service Demo');
});

app.use(_error_handler2.default.logErrors);
app.use(_error_handler2.default.clientErrorHandler);

app.server.listen(_config2.default.port);
console.log('Server running on port ' + app.server.address().port);

exports.default = app;
//# sourceMappingURL=index.js.map