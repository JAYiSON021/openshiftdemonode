'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _learner2 = require('../../models/users/learner');

var _learner3 = _interopRequireDefault(_learner2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LearnerRepository = function () {
    function LearnerRepository() {
        _classCallCheck(this, LearnerRepository);
    }

    _createClass(LearnerRepository, [{
        key: 'insertLearner',
        value: function insertLearner(body, callback) {

            console.log('*** LearnerRepository.insertLearner');

            return new Promise(function (fulfill, reject) {
                var newLearner = new _learner3.default();
                newLearner.first_name = body.firstname;
                newLearner.last_name = body.lastname;
                newLearner.birth_date = new Date(body.birth_date);
                newLearner.email = body.email;
                newLearner.contact_number = body.contact_number;
                newLearner.save(function (err, learner) {
                    if (err) {
                        reject(err);
                    } else if (!learner) {
                        var _err = { status: 404, message: 'learner not found' };
                        reject(_err);
                    } else {
                        fulfill(learner);
                    }
                });
            });
        }
    }, {
        key: 'insertInterestedTraining',
        value: function insertInterestedTraining(l_id, ihtr_id) {
            console.log('*** LearnerRepository.insertInterestedTraining');

            return new Promise(function (fulfill, reject) {
                _learner3.default.findById(l_id, function (err, _learner) {
                    if (err) {
                        reject(err);
                    } else if (!_learner) {
                        var _err2 = { status: 404, message: 'learner not found', learner: _learner };
                        reject(_err2);
                    } else {
                        _learner.interested_trainings.push(ihtr_id);
                        _learner.save(function (err, __learner) {
                            if (err) {
                                reject(err);
                            } else if (!__learner) {
                                var _err3 = { status: 500, message: 'cannot complete transaction' };
                                reject(_err3);
                            } else {
                                fulfill(__learner);
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'removeInterestedTraining',
        value: function removeInterestedTraining(l_id, ihtr_id) {
            console.log('*** LearnerRepository.removeInterestedTraining');

            return new Promise(function (fulfill, reject) {

                _learner3.default.update({ "_id": l_id }, { $pull: { "interested_trainings": ihtr_id } }, function (err, _learner) {
                    if (err) {
                        reject(err);
                    } else if (!_learner) {
                        var _err4 = { status: 404, message: 'learner not found', learner: _learner };
                        reject(_err4);
                    } else {
                        fulfill(_learner);
                    }
                });
            });
        }
    }, {
        key: 'getInfoById',
        value: function getInfoById(l_id) {
            console.log('*** LearnerRepository.getInfoById');

            return new Promise(function (fulfill, reject) {
                _learner3.default.findById(l_id, function (err, learner) {
                    if (err) {
                        reject(err);
                    } else if (!learner) {
                        var _err5 = { status: 404, message: 'learner not found' };
                        reject(_err5);
                    } else {
                        fulfill(learner);
                    }
                });
            });
        }
    }, {
        key: 'getInfoByIdArray',
        value: function getInfoByIdArray(l_ids) {
            console.log('*** LearnerRepository.getInfoByIdArray');
            return new Promise(function (fulfill, reject) {
                _learner3.default.find({ "_id": { "$in": l_ids } }, function (err, learners) {
                    if (err) {
                        reject(err);
                    } else if (!learners) {
                        var _err6 = { status: 404, message: 'learners not found' };
                        reject(_err6);
                    } else {
                        fulfill(learners);
                    }
                });
            });
        }
    }, {
        key: 'getInfoByIdArrayReturnIds',
        value: function getInfoByIdArrayReturnIds(l_ids) {
            console.log('*** LearnerRepository.getInfoByIdArrayReturnIds');
            var responseFields = { "_id": 1 };
            return new Promise(function (fulfill, reject) {
                _learner3.default.find({ "_id": { "$in": l_ids } }, responseFields, function (err, learners) {
                    if (err) {
                        reject(err);
                    } else if (!learners) {
                        var _err7 = { status: 404, message: 'learners not found' };
                        reject(_err7);
                    } else {
                        var ids = [];
                        learners.forEach(function (l) {
                            ids.push(l._id);
                        });
                        fulfill(ids);
                    }
                });
            });
        }
    }, {
        key: 'searchByKeyword',
        value: function searchByKeyword(key) {
            console.log('*** LearnerRepository.searchByKeyword: ' + key);

            var responseFields = { "_id": 1, "email": 1, "first_name": 1, "last_name": 1 };
            return new Promise(function (fulfill, reject) {
                _learner3.default.find({
                    $or: [{ "first_name": { $regex: new RegExp(key, "ig") } }, { "last_name": { $regex: new RegExp(key, "ig") } }, { "email": { $regex: new RegExp(key, "ig") } }]
                }, responseFields, function (err, learners) {
                    if (err) {
                        reject(err);
                    } else if (!learners) {
                        var _err8 = { status: 404, message: 'learners not found' };
                        reject(_err8);
                    } else {
                        fulfill(learners);
                    }
                });
            });
        }
    }]);

    return LearnerRepository;
}();

module.exports = new LearnerRepository();
//# sourceMappingURL=learner_repo.js.map