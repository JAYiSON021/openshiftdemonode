'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _account = require('../../models/users/account');

var _account2 = _interopRequireDefault(_account);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountRepository = function () {
    function AccountRepository() {
        _classCallCheck(this, AccountRepository);
    }

    _createClass(AccountRepository, [{
        key: 'insertAccount',
        value: function insertAccount(body) {
            console.log('*** AccountRepository.insertAccount');
            return new _promise2.default(function (fulfill, reject) {
                _account2.default.register(new _account2.default({
                    username: body.email,
                    usertype: body.u_type
                }), body.password, function (err, account) {
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(account);
                    }
                });
            });
        }
    }, {
        key: 'updateAccountProfile',
        value: function updateAccountProfile(account, profile) {
            console.log('*** AccountRepository.updateAccountProfile');

            return new _promise2.default(function (fulfill, reject) {
                account.profile = profile;
                account.save(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(account);
                    }
                });
            });
        }
    }, {
        key: 'getAccountByUtypeUname',
        value: function getAccountByUtypeUname(u_type, u_name) {
            console.log('*** AccountRepository.getAccountByUtypeUname');

            return new _promise2.default(function (fulfill, reject) {
                _account2.default.findOne({ usertype: u_type, username: u_name }, function (err, learner) {
                    if (err) {
                        reject(err);
                    } else {
                        fulfill(learner);
                    }
                });
            });
        }
    }, {
        key: 'getAccountByUserId',
        value: function getAccountByUserId(u_id) {
            console.log('*** AccountRepository.getAccountByUtypeUname');

            return new _promise2.default(function (fulfill, reject) {
                _account2.default.findById(u_id, function (err, account) {
                    if (err) {
                        reject(err);
                    } else if (!account) {
                        var _err = { status: 404, message: 'Account not found' };
                        reject(_err);
                    } else {
                        fulfill(account);
                    }
                });
            });
        }
    }]);

    return AccountRepository;
}();

module.exports = new AccountRepository();
//# sourceMappingURL=account_repo.js.map