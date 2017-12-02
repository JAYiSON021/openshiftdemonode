'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocalMongoose = require('passport-local-mongoose');

var _passportLocalMongoose2 = _interopRequireDefault(_passportLocalMongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var AdminAccount = new Schema({
    email: String,
    password: String,
    usertype: {
        type: String,
        required: true
    },
    profile: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

AdminAccount.plugin(_passportLocalMongoose2.default);
module.exports = _mongoose2.default.model('AdminAccount', AdminAccount);
//# sourceMappingURL=account.js.map