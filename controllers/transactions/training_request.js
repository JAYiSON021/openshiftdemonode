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

var _training_request_repo = require('../../lib/repo/training_request_repo');

var _training_request_repo2 = _interopRequireDefault(_training_request_repo);

var _account_repo = require('../../lib/repo/account_repo');

var _account_repo2 = _interopRequireDefault(_account_repo);

var _learner_repo = require('../../lib/repo/learner_repo');

var _learner_repo2 = _interopRequireDefault(_learner_repo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Middlewares
// Core
exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express2.default)();

    // '/v1/request/new'
    api.post('/new', _authmiddleware.authenticate, function (req, res, next) {

        _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
            return _learner_repo2.default.getInfoById(account.profile);
        }).then(function (profile) {
            return _training_request_repo2.default.insertTrainingRequest(req.body, profile._id);
        }).then(function (training_req) {
            return res.status(200).json(training_req);
        }).catch(function (err) {
            next(err);
        });
    });

    // '/v1/request/all'
    api.get('/all', _authmiddleware.authenticate, _authmiddleware.isGurus, function (req, res, next) {
        _training_request_repo2.default.getAllTrainingRequest().then(function (trequest) {
            res.status(200).json({ count: trequest.length, trequest: trequest });
        }).catch(function (err) {
            return next(err);
        });
    });

    return api;
};

// Repos


// Utils
//# sourceMappingURL=training_request.js.map