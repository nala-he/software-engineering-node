"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
const mongoose = require('mongoose');
const UserSchema_1 = require("./UserSchema");
const UserModel = mongoose.model('UserModel', UserSchema_1.default);
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map