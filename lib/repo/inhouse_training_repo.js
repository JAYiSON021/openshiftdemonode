'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _inhouse_training = require('../../models/transactions/inhouse_training');

var _inhouse_training2 = _interopRequireDefault(_inhouse_training);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InHouseTrainingRepository = function () {
    function InHouseTrainingRepository() {
        _classCallCheck(this, InHouseTrainingRepository);
    }

    _createClass(InHouseTrainingRepository, [{
        key: 'insertInHouseTraining',
        value: function insertInHouseTraining(body) {
            console.log('*** InHouseTrainingRepository.insertInHouseTraining');

            return new _promise2.default(function (fulfill, reject) {

                var newInHouseTraining = new _inhouse_training2.default();

                newInHouseTraining.topic = body.topic;
                newInHouseTraining.frequency = body.frequency;
                newInHouseTraining.description = body.description;
                newInHouseTraining.sme = body.sme;
                newInHouseTraining.location = body.location;
                newInHouseTraining.max_attendees = body.max_attendees;
                newInHouseTraining.training_time = body.training_time;
                newInHouseTraining.training_dates = dateIfy(body.training_dates);

                newInHouseTraining.save(function (err, _newInHouseTraining) {
                    if (err) {
                        reject(err);
                    } else if (!_newInHouseTraining) {
                        var _err = { status: 500, message: 'Failed to insert new In-house Training' };
                        reject(_err);
                    } else {
                        fulfill(_newInHouseTraining);
                    }
                });
            });
        }
    }, {
        key: 'getAllInhouseTrainings',
        value: function getAllInhouseTrainings() {
            console.log('*** InHouseTrainingRepository.getAllInhouseTrainings');

            return new _promise2.default(function (fulfill, reject) {
                _inhouse_training2.default.find({}, function (err, _inhouseTrainings) {
                    if (err) {
                        reject(err);
                    } else if (!_inhouseTrainings) {
                        var _err2 = { status: 404, message: 'Cant find any Training' };
                        reject(_err2);
                    } else {
                        fulfill(_inhouseTrainings);
                    }
                }).sort({ createdAt: -1 });
            });
        }
    }, {
        key: 'insertInterestedLearner',
        value: function insertInterestedLearner(id, lid) {

            console.log('*** InHouseTrainingRepository.insertInterestedLearner');

            return new _promise2.default(function (fulfill, reject) {
                _inhouse_training2.default.findById(id, function (err, _inhouseTraining) {
                    if (err) {
                        reject(err);
                    } else if (!_inhouseTraining) {
                        var _err3 = { status: 404, message: 'Cant find Training' };
                        reject(_err3);
                    } else {
                        _inhouseTraining.interested_learners.push(lid);
                        _inhouseTraining.save(function (err, __inhouseTraining) {
                            if (err) {
                                reject(err);
                            } else if (!__inhouseTraining) {
                                var _err4 = { status: 400, message: 'Unable to process' };
                                reject(_err4);
                            } else {
                                fulfill(_inhouseTraining);
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'insertInterestedLearner',
        value: function insertInterestedLearner(id, lid) {

            console.log('*** InHouseTrainingRepository.insertInterestedLearner');

            return new _promise2.default(function (fulfill, reject) {
                _inhouse_training2.default.findById(id, function (err, _inhouseTraining) {
                    if (err) {
                        reject(err);
                    } else if (!_inhouseTraining) {
                        var _err5 = { status: 404, message: 'Cant find Training' };
                        reject(_err5);
                    } else {
                        _inhouseTraining.interested_learners.push(lid);
                        _inhouseTraining.save(function (err, __inhouseTraining) {
                            if (err) {
                                reject(err);
                            } else if (!__inhouseTraining) {
                                var _err6 = { status: 400, message: 'Unable to process' };
                                reject(_err6);
                            } else {
                                fulfill(_inhouseTraining);
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'insertGoingLearner',
        value: function insertGoingLearner(id, lid) {

            console.log('*** InHouseTrainingRepository.insertGoingLearner');

            return new _promise2.default(function (fulfill, reject) {
                _inhouse_training2.default.findById(id, function (err, _inhouseTraining) {
                    if (err) {
                        reject(err);
                    } else if (!_inhouseTraining) {
                        var _err7 = { status: 404, message: 'Cant find Training' };
                        reject(_err7);
                    } else {
                        _inhouseTraining.going_learners.push(lid);
                        _inhouseTraining.interested_learners.remove(lid);
                        _inhouseTraining.save(function (err, __inhouseTraining) {
                            if (err) {
                                reject(err);
                            } else if (!__inhouseTraining) {
                                var _err8 = { status: 400, message: 'Unable to process' };
                                reject(_err8);
                            } else {
                                fulfill(_inhouseTraining);
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'insertGoingLearners',
        value: function insertGoingLearners(id, lids) {

            console.log('*** InHouseTrainingRepository.insertGoingLearners');

            return new _promise2.default(function (fulfill, reject) {
                _inhouse_training2.default.update({ "_id": id }, { $addToSet: { going_learners: { $each: lids } } }, { upsert: true }, function (err, _inhouseTraining) {
                    if (err) {
                        reject(err);
                    } else if (!_inhouseTraining) {
                        var _err9 = { status: 404, message: 'Cant find Training' };
                        reject(_err9);
                    } else {
                        fulfill(_inhouseTraining);
                    }
                });
            });
        }
    }, {
        key: 'removeInterestedLearner',
        value: function removeInterestedLearner(id, lid) {
            console.log('*** InHouseTrainingRepository.removeInterestedLearner');

            return new _promise2.default(function (fulfill, reject) {

                _inhouse_training2.default.update({ "_id": id }, { $pull: { "interested_learners": lid } }, function (err, _inhouseTraining) {
                    if (err) {
                        reject(err);
                    } else if (!_inhouseTraining) {
                        var _err10 = { status: 404, message: 'Cant find Training' };
                        reject(_err10);
                    } else {
                        fulfill(_inhouseTraining);
                    }
                });
            });
        }
    }, {
        key: 'getInterestedLearnerIds',
        value: function getInterestedLearnerIds(id) {
            console.log('*** InHouseTrainingRepository.getInterestedLearnerIds');

            return new _promise2.default(function (fulfill, reject) {

                var returnField = { "interested_learners": 1 };
                _inhouse_training2.default.findById(id, returnField, function (err, ihtr) {
                    if (err) {
                        reject(err);
                    } else if (!ihtr) {
                        var _err11 = { status: 404, message: 'Cant find Training' };
                        reject(_err11);
                    } else {
                        fulfill(ihtr);
                    }
                });
            });
        }
    }, {
        key: 'getGoingLearnerIds',
        value: function getGoingLearnerIds(id) {
            console.log('*** InHouseTrainingRepository.getGoingLearnerIds');

            return new _promise2.default(function (fulfill, reject) {

                var returnField = { "going_learners": 1 };
                _inhouse_training2.default.findById(id, returnField, function (err, ihtr) {
                    if (err) {
                        reject(err);
                    } else if (!ihtr) {
                        var _err12 = { status: 404, message: 'Cant find Training' };
                        reject(_err12);
                    } else {
                        fulfill(ihtr);
                    }
                });
            });
        }
    }, {
        key: 'searchByKey',
        value: function searchByKey(key) {

            console.log('*** InHouseTrainingRepository.searchByKey: ' + key);
            return new _promise2.default(function (fulfill, reject) {
                _inhouse_training2.default.find({
                    $or: [{ "topic": { $regex: new RegExp(key, "ig") } }, { "description": { $regex: new RegExp(key, "ig") } }, { "sme": { $regex: new RegExp(key, "ig") } }]
                }, function (err, ihtr) {
                    if (err) {
                        reject(err);
                    } else if (!ihtr) {
                        var _err13 = { status: 404, message: 'ihtr not found' };
                        reject(_err13);
                    } else {
                        fulfill(ihtr);
                    }
                });
            });
        }
    }]);

    return InHouseTrainingRepository;
}();

function dateIfy(dates) {
    var training_dates_arr = [];
    dates.forEach(function (tdate) {
        training_dates_arr.push(new Date(tdate));
    });
    return training_dates_arr;
}

module.exports = new InHouseTrainingRepository();
//# sourceMappingURL=inhouse_training_repo.js.map