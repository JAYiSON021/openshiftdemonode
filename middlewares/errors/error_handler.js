'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorHandlerGG = function () {
    function ErrorHandlerGG() {
        _classCallCheck(this, ErrorHandlerGG);
    }

    _createClass(ErrorHandlerGG, [{
        key: 'logErrors',
        value: function logErrors(err, req, res, next) {
            console.error({ error: JSON.stringify(err), path: req.route.path, date: new Date().toString() });
            next(err);
        }
    }, {
        key: 'clientErrorHandler',
        value: function clientErrorHandler(err, req, res, next) {
            if (req.xhr) {
                res.status(err.status || 400).json({ error: 'Something failed!' });
            } else {
                res.status(err.status || 400).send(err);
            }
        }
    }]);

    return ErrorHandlerGG;
}();

module.exports = new ErrorHandlerGG();
//# sourceMappingURL=error_handler.js.map