'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middlewares = require('../middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _account = require('../controllers/users/account');

var _account2 = _interopRequireDefault(_account);

var _training_request = require('../controllers/transactions/training_request');

var _training_request2 = _interopRequireDefault(_training_request);

var _inhouse_training = require('../controllers/transactions/inhouse_training');

var _inhouse_training2 = _interopRequireDefault(_inhouse_training);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// database connetion
(0, _db2.default)(function (db) {

    // internal middleware
    router.use((0, _middlewares2.default)({ config: _config2.default, db: db }));

    // API ROUTES v1

    // '/v1/account'
    router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));

    // '/v1/request'
    router.use('/request', (0, _training_request2.default)({ config: _config2.default, db: db }));

    // '/v1/ihtraining'
    router.use('/ihtraining', (0, _inhouse_training2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map