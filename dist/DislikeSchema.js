"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
/**
 * @file Implements mongoose schema in the likes collection
 */
const dislikeSchema = new mongoose.Schema({
    dislikedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    dislikedTuit: { type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel' }
}, { collection: 'dislikes' });
exports.default = dislikeSchema;
//# sourceMappingURL=DislikeSchema.js.map