'use strict';

var _check = require('express-validator/check');

var learnerRegValidation = [(0, _check.check)('email').isEmail().withMessage('Please Enter a valid email address.').trim().normalizeEmail(), (0, _check.check)('firstname').trim().isLength({ min: 1 }).withMessage('Please provide your first name.').exists(), (0, _check.check)('lastname').trim().isLength({ min: 1 }).withMessage('Please provide your last name.').exists(), (0, _check.check)('u_type', 'user type should be learner').trim().exists().custom(function (value, _ref) {
    var req = _ref.req;
    return value === 'learner';
}), (0, _check.check)('birth_date').trim().exists(), (0, _check.check)('contact_number').trim().exists(), (0, _check.check)('password').trim().isLength({ min: 6 }).withMessage('Please provide a password with atleast 6 characters').exists(), (0, _check.check)('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field').trim().exists().custom(function (value, _ref2) {
    var req = _ref2.req;
    return value === req.body.password;
}).withMessage('Password and confirm passwords should match.')];

var smeRegValidation = [(0, _check.check)('email').isEmail().withMessage('Please Enter a valid email address.').trim().normalizeEmail(), (0, _check.check)('firstname').trim().isLength({ min: 3 }).exists(), (0, _check.check)('lastname').trim().exists(), (0, _check.check)('u_type', 'user type should be an sme').trim().exists().custom(function (value, _ref3) {
    var req = _ref3.req;
    return value === 'sme';
}), (0, _check.check)('birth_date').trim().exists(), (0, _check.check)('password').trim().exists(), (0, _check.check)('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field').trim().exists().custom(function (value, _ref4) {
    var req = _ref4.req;
    return value === req.body.password;
})];

var guruRegValidation = [(0, _check.check)('email').isEmail().withMessage('Please Enter a valid email address.').trim().normalizeEmail(), (0, _check.check)('firstname').trim().isLength({ min: 3 }).exists(), (0, _check.check)('lastname').trim().exists(), (0, _check.check)('u_type', 'user type should be a gurus').trim().exists().custom(function (value, _ref5) {
    var req = _ref5.req;
    return value === 'gurus';
}), (0, _check.check)('birth_date').trim().exists(), (0, _check.check)('password').trim().exists(), (0, _check.check)('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field').trim().exists().custom(function (value, _ref6) {
    var req = _ref6.req;
    return value === req.body.password;
})];

module.exports = { learnerRegValidation: learnerRegValidation, smeRegValidation: smeRegValidation, guruRegValidation: guruRegValidation };
//# sourceMappingURL=register.js.map