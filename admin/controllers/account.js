'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

var _authmiddleware = require('../middlewares/authmiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express2.default)();

    // 'admin/account/login'
    api.post('/login', _passport2.default.authenticate('local', {
        session: false,
        scope: []
    }), _authmiddleware.generateAccessTokenAdmin, _authmiddleware.respond);

    // '/admin/account/logout'
    api.get('/logout', _authmiddleware.authenticate, function (req, res) {
        res.logout();
        res.status(200).send('Successfully Logged Out');
    });

    return api;
};
//# sourceMappingURL=account.js.map