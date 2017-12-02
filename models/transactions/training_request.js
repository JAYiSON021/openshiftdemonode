'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var TrainingRequest = new Schema({
    topic: {
        type: String,
        required: true
    },
    training_type: {
        type: String,
        required: true
    },
    group_name: {
        type: String,
        required: true
    },
    training_date: {
        type: Date,
        required: true
    },
    prefered_location: {
        type: String,
        required: true
    },
    expected_no_attendees: {
        type: Number
    },
    contact_person: {
        name: {
            type: String,
            required: true
        },
        email: String,
        contact_number: {
            type: String,
            reuired: true
        }
    },
    requested_by: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports = _mongoose2.default.model('TrainingRequest', TrainingRequest);
//# sourceMappingURL=training_request.js.map