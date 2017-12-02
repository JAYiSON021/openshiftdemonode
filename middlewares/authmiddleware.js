'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _account = require('../models/users/account');

var _account2 = _interopRequireDefault(_account);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _account_repo = require('../lib/repo/account_repo');

var _account_repo2 = _interopRequireDefault(_account_repo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKENTIME = _config2.default.tokentime;

// Repos

var SECRET = _config2.default.secret;

var authenticate = (0, _expressJwt2.default)({ secret: SECRET });

var generateAccessTokenSME = function generateAccessTokenSME(req, res, next) {
    _account_repo2.default.getAccountByUtypeUname("sme", req.body.email).then(function (result) {
        if (result) {
            req.token = req.token || {};
            req.token = _jsonwebtoken2.default.sign({
                id: req.user.id
            }, SECRET, {
                expiresIn: TOKENTIME
            });
            next();
        } else {
            var err = { status: 404, message: 'cant find sme' };
            next(err);
        }
    }).catch(function (err) {
        next(err);
    });
};

var generateAccessTokenLearner = function generateAccessTokenLearner(req, res, next) {
    _account_repo2.default.getAccountByUtypeUname("learner", req.body.email).then(function (result) {
        if (result) {
            req.token = req.token || {};
            req.token = _jsonwebtoken2.default.sign({
                id: req.user.id
            }, SECRET, {
                expiresIn: TOKENTIME
            });
            next();
        } else {
            var err = { status: 404, message: 'cant find learner' };
            next(err);
        }
    }).catch(function (err) {
        next(err);
    });
};

var generateAccessTokenGurus = function generateAccessTokenGurus(req, res, next) {
    _account_repo2.default.getAccountByUtypeUname("gurus", req.body.email).then(function (result) {
        if (result) {
            req.token = req.token || {};
            req.token = _jsonwebtoken2.default.sign({
                id: req.user.id
            }, SECRET, {
                expiresIn: TOKENTIME
            });
            next();
        } else {
            var err = { status: 404, message: 'cant find gurus' };
            next(err);
        }
    }).catch(function (err) {
        next(err);
    });
};

var respond = function respond(req, res) {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
};

var isGurus = function isGurus(req, res, next) {
    _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
        if (account.usertype) {
            if (account.usertype == 'gurus') {
                next();
            } else {
                var err = { status: 404, message: 'cant find gurus account' };
                next(err);
            }
        } else {
            var _err = { status: 404, message: 'cant find gurus' };
            next(_err);
        }
    });
};

var isLearner = function isLearner(req, res, next) {
    _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
        if (account.usertype) {
            if (account.usertype == 'learner') {
                next();
            } else {
                var err = { status: 404, message: 'cant find learner account' };
                next(err);
            }
        } else {
            var _err2 = { status: 404, message: 'cant find learner account' };
            next(_err2);
        }
    });
};

var isSme = function isSme(req, res, next) {
    _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
        if (account.usertype) {
            if (account.usertype == 'sme') {
                next();
            } else {
                var err = { status: 404, message: 'cant find sme account' };
                next(err);
            }
        } else {
            var _err3 = { status: 404, message: 'cant find sme account' };
            next(_err3);
        }
    });
};

module.exports = {
    authenticate: authenticate,
    generateAccessTokenSME: generateAccessTokenSME,
    generateAccessTokenLearner: generateAccessTokenLearner,
    generateAccessTokenGurus: generateAccessTokenGurus,
    respond: respond,
    isGurus: isGurus,
    isLearner: isLearner,
    isSme: isSme
};
//# sourceMappingURL=authmiddleware.js.map