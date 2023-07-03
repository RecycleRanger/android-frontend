"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsrType = exports.Actions = void 0;
var Actions;
(function (Actions) {
    Actions["added"] = "added";
    Actions["changed"] = "changed";
    Actions["deleted"] = "deleted";
})(Actions || (exports.Actions = Actions = {}));
var UsrType;
(function (UsrType) {
    UsrType[UsrType["teacher"] = 1] = "teacher";
    UsrType[UsrType["student"] = 2] = "student";
})(UsrType || (exports.UsrType = UsrType = {}));
