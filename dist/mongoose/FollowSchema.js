"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
/**
 * @file Implements mongoose schema in the follows collection
 */
const followSchema = new mongoose.Schema({
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    followedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }
}, { collection: 'follows' });
exports.default = followSchema;
//# sourceMappingURL=FollowSchema.js.map