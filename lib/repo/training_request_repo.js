'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _training_request = require('../../models/transactions/training_request');

var _training_request2 = _interopRequireDefault(_training_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrainingRequestRepository = function () {
    function TrainingRequestRepository() {
        _classCallCheck(this, TrainingRequestRepository);
    }

    _createClass(TrainingRequestRepository, [{
        key: 'insertTrainingRequest',
        value: function insertTrainingRequest(body, learner) {
            console.log('*** TrainingRequestRepository.insertTrainingRequest');

            return new _promise2.default(function (fulfill, reject) {

                var newTrainingRequest = new _training_request2.default();
                newTrainingRequest.topic = body.topic;
                newTrainingRequest.training_type = body.training_type;
                newTrainingRequest.group_name = body.group_name;
                newTrainingRequest.training_date = new Date(body.training_date);
                newTrainingRequest.prefered_location = body.prefered_location;
                newTrainingRequest.expected_no_attendees = body.expected_no_attendees;
                newTrainingRequest.contact_person = body.contact_person;
                newTrainingRequest.requested_by = learner;

                newTrainingRequest.save(function (err, newTrainingReq) {
                    if (err) {
                        reject(err);
                    } else if (!newTrainingReq) {
                        var _err = { status: 500, message: 'Failed to Insert Training Request' };
                        reject(_err);
                    } else {
                        fulfill(newTrainingReq);
                    }
                });
            });
        }
    }, {
        key: 'getAllTrainingRequest',
        value: function getAllTrainingRequest() {
            console.log('*** TrainingRequestRepository.getAllTrainingRequest');

            return new _promise2.default(function (fulfill, reject) {
                _training_request2.default.find({}, function (err, trequests) {
                    if (err) {
                        reject(err);
                    } else if (!trequests) {
                        var _err2 = { status: 404, message: 'training requests not found' };
                        reject(_err2);
                    } else {
                        fulfill(trequests);
                    }
                }).sort({ createdAt: -1 });
            });
        }
    }]);

    return TrainingRequestRepository;
}();

module.exports = new TrainingRequestRepository();
//# sourceMappingURL=training_request_repo.js.map