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

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _account = require('../controllers/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// database connetion
(0, _db2.default)(function (db) {

    // internal middleware
    router.use((0, _middlewares2.default)({ config: _config2.default, db: db }));

    // API ROUTES admin

    // '/admin/account'
    router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map