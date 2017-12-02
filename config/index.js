"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// sets of configs that are advised not to commit on public repos
// or must be in environmental vars.

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
exports.default = {
    
    "port": port,
    "localMongoUrl": "mongodb://localhost:27017/gg-platform",
    "mongoUrlProd": "mongodb://62b9ccd95243103bd6e83644b2d11dff:72F86f7c252b888@5a.mongo.evennode.com:27017,5b.mongo.evennode.com:27017/62b9ccd95243103bd6e83644b2d11dff?replicaSet=us-5",
    "bodyLimit": "100kb",
    "secret": "1 haV3 th3 kN0w how",
    "tokentime": 60 * 60 * 24 * 7 // 1 week
};
//# sourceMappingURL=index.js.map