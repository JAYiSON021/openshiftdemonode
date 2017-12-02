'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Gurus = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    contact_number: Number,
    email: {
        type: String,
        required: true
    },
    gender: String,
    address: String,
    img_url: {
        type: String,
        default: 'und'
    }
}, {
    timestamps: true
});

module.exports = _mongoose2.default.model('Gurus', Gurus);
//# sourceMappingURL=gurus.js.map