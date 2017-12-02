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

var _inhouse_training_repo = require('../../lib/repo/inhouse_training_repo');

var _inhouse_training_repo2 = _interopRequireDefault(_inhouse_training_repo);

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

    // '/v1/ihtraining/new'
    api.post('/new', _authmiddleware.authenticate, _authmiddleware.isGurus, function (req, res, next) {
        _inhouse_training_repo2.default.insertInHouseTraining(req.body).then(function (data) {
            return res.status(200).json(data);
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/ihtraining/interested/learner'
    api.post('/interested/learner', _authmiddleware.authenticate, _authmiddleware.isLearner, function (req, res, next) {
        var result = {};
        _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
            return _learner_repo2.default.getInfoById(account.profile);
        }).then(function (learner) {
            result = learner;
            return _inhouse_training_repo2.default.insertInterestedLearner(req.body.id, learner._id);
        }).then(function (ihtr) {
            return _learner_repo2.default.insertInterestedTraining(result._id, ihtr._id);
        }).then(function (data) {
            return res.status(200).json(data);
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/ihtraining/going/learner'
    api.post('/going/learner', _authmiddleware.authenticate, _authmiddleware.isGurus, function (req, res, next) {
        _learner_repo2.default.getInfoByIdArrayReturnIds(req.body.ids).then(function (learners) {
            return _inhouse_training_repo2.default.insertGoingLearners(req.body.ihtr_id, learners);
        }).then(function (data) {
            return res.status(200).json(data);
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/ihtraining/interested/learner/remove'
    api.post('/interested/learner/remove', _authmiddleware.authenticate, _authmiddleware.isLearner, function (req, res, next) {
        var result = {};
        _account_repo2.default.getAccountByUserId(req.user.id).then(function (account) {
            return _learner_repo2.default.getInfoById(account.profile);
        }).then(function (learner) {
            result = learner;
            return _inhouse_training_repo2.default.removeInterestedLearner(req.body.id, learner._id);
        }).then(function (ihtr) {
            return _learner_repo2.default.removeInterestedTraining(result._id, req.body.id);
        }).then(function (data) {
            return res.status(200).json(data);
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/ihtraining/all'
    api.get('/all', _authmiddleware.authenticate, _authmiddleware.isGurus, function (req, res, next) {
        _inhouse_training_repo2.default.getAllInhouseTrainings().then(function (data) {
            return res.status(200).json({ count: data.length, data: data });
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/ihtraining/learner/all'
    api.get('/learner/all', function (req, res, next) {
        _inhouse_training_repo2.default.getAllInhouseTrainings().then(function (data) {
            return res.status(200).json({ count: data.length, data: data });
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/ihtraining/interested/:id'
    api.get('/interested/:id', _authmiddleware.authenticate, _authmiddleware.isGurus, function (req, res, next) {
        _inhouse_training_repo2.default.getInterestedLearnerIds(req.params.id).then(function (interested_learners) {
            return _learner_repo2.default.getInfoByIdArray(interested_learners.interested_learners);
        }).then(function (learners) {
            return res.status(200).json({ count: learners.length, learners: learners });
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/ihtraining/going/:id'
    api.get('/going/:id', _authmiddleware.authenticate, _authmiddleware.isGurus, function (req, res, next) {
        _inhouse_training_repo2.default.getGoingLearnerIds(req.params.id).then(function (going_learners) {
            return _learner_repo2.default.getInfoByIdArray(going_learners.going_learners);
        }).then(function (learners) {
            return res.status(200).json({ count: learners.length, learners: learners });
        }).catch(function (err) {
            return next(err);
        });
    });

    // '/v1/ihtraining/search/:key'
    api.get('/search/:key', function (req, res, next) {
        _inhouse_training_repo2.default.searchByKey(req.params.key).then(function (data) {
            return res.status(200).json({ count: data.length, data: data });
        }).catch(function (err) {
            return next(err);
        });
    });

    return api;
};

// Repos


// Utils
//# sourceMappingURL=inhouse_training.js.map