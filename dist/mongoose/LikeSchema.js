"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
/**
 * @file Implements mongoose schema in the likes collection
 */
const likeSchema = new mongoose.Schema({
    likedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    likedTuit: { type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel' }
}, { collection: 'likes' });
exports.default = likeSchema;
//# sourceMappingURL=LikeSchema.js.map