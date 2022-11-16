"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
/**
 * @file Implements mongoose schema in the tuits collection
 */
const TuitSchema = new mongoose.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    stats: {
        replies: { type: Number, default: 0 },
        retuits: { type: Number, default: 0 },
        likes: { type: Number, default: 0 }
    }
}, { collection: 'tuits' });
exports.default = TuitSchema;
//# sourceMappingURL=TuitSchema.js.map