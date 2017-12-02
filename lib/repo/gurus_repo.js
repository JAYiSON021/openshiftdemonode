'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gurus = require('../../models/users/gurus');

var _gurus2 = _interopRequireDefault(_gurus);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GurusRepository = function () {
    function GurusRepository() {
        _classCallCheck(this, GurusRepository);
    }

    _createClass(GurusRepository, [{
        key: 'insertGuru',
        value: function insertGuru(body) {
            console.log('*** GurusRepository.insertGuru');

            return new _promise2.default(function (fulfill, reject) {
                var newGuru = new _gurus2.default();
                newGuru.first_name = body.firstname;
                newGuru.last_name = body.lastname;
                newGuru.birth_date = new Date(body.birth_date);
                newGuru.email = body.email;
                newGuru.save(function (err, guru) {
                    if (err) {
                        reject(err);
                    } else if (!guru) {
                        var _err = { status: 404, message: 'gurus not found' };
                        reject(_err);
                    } else {
                        fulfill(guru);
                    }
                });
            });
        }
    }, {
        key: 'getInfoById',
        value: function getInfoById(g_id) {
            console.log('*** GurusRepository.getInfoById');

            return new _promise2.default(function (fulfill, reject) {
                _gurus2.default.findById(g_id, function (err, learner) {
                    if (err) {
                        reject(err);
                    } else if (!learner) {
                        var _err2 = { status: 404, message: 'gurus not found' };
                        reject(_err2);
                    } else {
                        fulfill(learner);
                    }
                });
            });
        }
    }]);

    return GurusRepository;
}();

module.exports = new GurusRepository();
//# sourceMappingURL=gurus_repo.js.map