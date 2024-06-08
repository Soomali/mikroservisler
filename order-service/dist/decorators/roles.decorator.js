"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = exports.AuthorizationLevel = void 0;
const common_1 = require("@nestjs/common");
var AuthorizationLevel;
(function (AuthorizationLevel) {
    AuthorizationLevel["admin"] = "admin";
    AuthorizationLevel["customer"] = "customer";
    AuthorizationLevel["courier"] = "courier";
    AuthorizationLevel["restaurant"] = "restaurant";
})(AuthorizationLevel || (exports.AuthorizationLevel = AuthorizationLevel = {}));
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map