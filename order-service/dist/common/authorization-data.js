"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationData = void 0;
class AuthorizationData {
    constructor(email, authorization_level, is_verified, _id) {
        this.email = email;
        this.authorization_level = authorization_level;
        this.is_verified = is_verified;
        this._id = _id;
    }
    static parseFrom(req) {
        if (req == null || req == undefined) {
            return null;
        }
        console.log('parsing authorization data of', req.headers);
        if (req.headers['user-email'] == null || req.headers['authorization-level'] == null) {
            return null;
        }
        return new AuthorizationData(req.headers['user-email'], req.headers['authorization-level'], req.headers['verified'] == 'true', req.headers['user-id']);
    }
    toHeaders() {
        return {
            'user-email': this.email,
            'authorization-level': this.authorization_level,
            'verified': this.is_verified,
            'user-id': this._id,
        };
    }
}
exports.AuthorizationData = AuthorizationData;
//# sourceMappingURL=authorization-data.js.map