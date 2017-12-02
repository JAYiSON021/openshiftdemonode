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

var _check = require('express-validator/check');

var _filter = require('express-validator/filter');

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _authmiddleware = require('../../middlewares/authmiddleware');

var _register = require('../../middlewares/validators/users/register');

var _account_repo = require('../../lib/repo/account_repo');

var _account_repo2 = _interopRequireDefault(_account_repo);

var _learner_repo = require('../../lib/repo/learner_repo');

var _learner_repo2 = _interopRequireDefault(_learner_repo);

var _sme_repo = require('../../lib/repo/sme_repo');

var _sme_repo2 = _interopRequireDefault(_sme_repo);

var _gurus_repo = require('../../lib/repo/gurus_repo');

var _gurus_repo2 = _interopRequireDefault(_gurus_repo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repos


// Middlewares
// Core
exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express2.default)();

    // '/v1/account/register/learner'
    api.post('/register/learner', _register.learnerRegValidation, function (req, res, next) {

        var errors = (0, _check.validationResult)(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        } else {

            var result = [];
            _account_repo2.default.insertAccount(req.body).then(function (result1) {
                result[0] = result1;
                return _learner_repo2.default.insertLearner(req.body);
            }).then(function (result2) {
                result[1] = result2;
                return _account_repo2.default.updateAccountProfile(result[0], result[1]._id);
            }).then(function (finalResult) {
                _passport2.default.authenticate('local', { session: false })(req, res, function () {
                    res.status(200).json({ code: "success", message: 'Learner Registered Successfuly!' });
                });
                result = [];
            }).catch(function (err) {
                next(err);
                result = [];
            });
        }
    });

    // '/v1/account/register/sme'
    api.post('/register/sme', _register.smeRegValidation, function (req, res, next) {

        var errors = (0, _check.validationResult)(req);

        if (!errors.isEmpty()) {
            next(errors.mapped());
        } else {
            var result = [];
            _account_repo2.default.insertAccount(req.body).then(function (result1) {
                result[0] = result1;
                return _sme_repo2.default.insertSme(req.body);
            }).then(function (result2) {
                result[1] = result2;
                return _account_repo2.default.updateAccountProfile(result[0], result[1]._id);
            }).then(function (finalResult) {
                _passport2.default.authenticate('local', { session: false })(req, res, function () {
                    res.status(200).json({ code: "success", message: 'Sme Registered Successfuly!' });
                });
                result = [];
            }).catch(function (err) {
                next(err);
                result = [];
            });
        }
    });

    // '/v1/account/register/gurus'
    api.post('/register/gurus', _register.guruRegValidation, function (req, res, next) {

        var errors = (0, _check.validationResult)(req);

        if (!errors.isEmpty()) {
            next(errors.mapped());
        } else {
            var result = [];
            _account_repo2.default.insertAccount(req.body).then(function (result1) {
                result[0] = result1;
                return _gurus_repo2.default.insertGuru(req.body);
            }).then(function (result2) {
                result[1] = result2;
                return _account_repo2.default.updateAccountProfile(result[0], result[1]._id);
            }).then(function (finalResult) {
                _passport2.default.authenticate('local', { session: false })(req, res, function () {
                    res.status(200).json({ code: "success", message: 'Gurus Admin Registered Successfuly!' });
                });
                result = [];
            }).catch(function (err) {
                next(err);
                result = [];
            });
        }
    });

    // 'v1/account/login/gurus'
    api.post('/login/gurus', _passport2.default.authenticate('local', {
        session: false,
        scope: []
    }), _authmiddleware.generateAccessTokenGurus, _authmiddleware.respond);

    // 'v1/account/login/sme'
    api.post('/login/sme', _passport2.default.authenticate('local', {
        session: false,
        scope: []
    }), _authmiddleware.generateAccessTokenSME, _authmiddleware.respond);

    // 'v1/account/login/learner'
    api.post('/login/learner', _passport2.default.authenticate('local', {
        session: false,
        scope: []
    }), _authmiddleware.generateAccessTokenLearner, _authmiddleware.respond);

    // '/v1/account/logout'
    api.get('/logout', _authmiddleware.authenticate, function (req, res) {
        req.logout();
        res.status(200).json({ message: 'logout success' });
    });

    // '/v1/account/info/learner'
    api.get('/info/learner', _authmiddleware.authenticate, function (req, res, next) {
        _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
            return _learner_repo2.default.getInfoById(account.profile);
        }).then(function (profile) {
            return res.status(200).json(profile);
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/account/info/sme'
    api.get('/info/sme', _authmiddleware.authenticate, function (req, res, next) {
        _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
            return _sme_repo2.default.getInfoById(account.profile);
        }).then(function (profile) {
            return res.status(200).json(profile);
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/account/info/gurus'
    api.get('/info/gurus', _authmiddleware.authenticate, function (req, res, next) {
        _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
            return _gurus_repo2.default.getInfoById(account.profile);
        }).then(function (profile) {
            return res.status(200).json(profile);
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/account/learner/:lid'
    api.get('/learner/:lid', _authmiddleware.authenticate, _authmiddleware.isGurus, function (req, res, next) {
        _learner_repo2.default.getInfoById(req.params.lid).then(function (profile) {
            return res.status(200).json(profile);
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/account/learner/search/:key'
    api.get('/learner/search/:key', _authmiddleware.authenticate, _authmiddleware.isGurus, function (req, res, next) {
        _learner_repo2.default.searchByKeyword(req.params.key).then(function (learners) {
            return res.status(200).json({ count: learners.length, learners: learners });
        }).catch(function (err) {
            return next(err);
        });
    });

    return api;
};

// Utils
//# sourceMappingURL=account.js.map