"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * @file Implements mongoose schema in the follows collection
 */
const followSchema = new mongoose_1.default.Schema({
    following: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
    followedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' }
}, { collection: 'follows' });
exports.default = followSchema;
//# sourceMappingURL=FollowSchema.js.map