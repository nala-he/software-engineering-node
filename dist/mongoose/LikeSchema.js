"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * @file Implements mongoose schema in the likes collection
 */
const likeSchema = new mongoose_1.default.Schema({
    likedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
    likedTuit: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'TuitModel' }
}, { collection: 'likes' });
exports.default = likeSchema;
//# sourceMappingURL=LikeSchema.js.map