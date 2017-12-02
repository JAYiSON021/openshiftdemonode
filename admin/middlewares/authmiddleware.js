'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKENTIME = _config2.default.tokentime;
var SECRET = _config2.default.secret;

var authenticate = (0, _expressJwt2.default)({ secret: SECRET });

var generateAccessTokenAdmin = function generateAccessTokenAdmin(req, res, next) {
    _account2.default.find({ usertype: "admin", username: req.body.email }, function (err, vadmin) {
        if (err) {
            res.json({ error: err.message });
        }
        if (vadmin.length > 0) {
            req.token = req.token || {};
            req.token = _jsonwebtoken2.default.sign({
                id: req.user.id
            }, SECRET, {
                expiresIn: TOKENTIME
            });
            next();
        } else {
            res.status(404).json({
                code: "not found",
                message: "Invalid email or password"
            });
        }
    });
};

var respond = function respond(req, res) {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
};

module.exports = { authenticate: authenticate, generateAccessTokenAdmin: generateAccessTokenAdmin, respond: respond };
//# sourceMappingURL=authmiddleware.js.map