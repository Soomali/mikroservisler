"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIfNotNull = void 0;
const class_validator_1 = require("class-validator");
function ValidateIfNotNull() {
    return (0, class_validator_1.ValidateIf)((obj, val) => val != null);
}
exports.ValidateIfNotNull = ValidateIfNotNull;
//# sourceMappingURL=validate-if-not-null.decorator.js.map