"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the follows collection
 */
const mongoose_1 = require("mongoose");
const FollowSchema_1 = require("./FollowSchema");
const followModel = mongoose_1.default.model('FollowModel', FollowSchema_1.default);
exports.default = followModel;
//# sourceMappingURL=FollowModel.js.map