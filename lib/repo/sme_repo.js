'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sme = require('../../models/users/sme');

var _sme2 = _interopRequireDefault(_sme);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmeRepository = function () {
    function SmeRepository() {
        _classCallCheck(this, SmeRepository);
    }

    _createClass(SmeRepository, [{
        key: 'insertSme',
        value: function insertSme(body, callback) {
            console.log('*** SmeRepository.insertSme');

            return new _promise2.default(function (fulfill, reject) {
                var newSme = new _sme2.default();
                newSme.first_name = body.firstname;
                newSme.last_name = body.lastname;
                newSme.birth_date = new Date(body.birth_date);
                newSme.email = body.email;
                newSme.save(function (err, sme) {
                    if (err) {
                        reject(err);
                    } else if (!sme) {
                        var _err = { status: 404, message: 'sme not found' };
                        reject(_err);
                    } else {
                        fulfill(sme);
                    }
                });
            });
        }
    }, {
        key: 'getInfoById',
        value: function getInfoById(s_id) {
            console.log('*** SmeRepository.getInfoById');

            return new _promise2.default(function (fulfill, reject) {
                _sme2.default.findById(s_id, function (err, sme) {
                    if (err) {
                        reject(err);
                    } else if (!sme) {
                        var _err2 = { status: 404, message: 'sme not found' };
                        reject(_err2);
                    } else {
                        fulfill(sme);
                    }
                });
            });
        }
    }]);

    return SmeRepository;
}();

module.exports = new SmeRepository();
//# sourceMappingURL=sme_repo.js.map