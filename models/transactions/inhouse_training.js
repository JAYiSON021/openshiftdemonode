'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var InHouseTraining = new Schema({
    topic: {
        type: String,
        required: true
    },
    description: String,
    frequency: {
        type: String,
        required: true
    },
    training_dates: [Date],
    training_time: {
        from: String,
        to: String
    },
    interested_learners: [{ type: Schema.Types.ObjectId }],
    going_learners: [{ type: Schema.Types.ObjectId }],
    sme: { // TODO: Temporarily a String, but can be the Firstname of the SME
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    max_attendees: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = _mongoose2.default.model('InHouseTraining', InHouseTraining);
//# sourceMappingURL=inhouse_training.js.map