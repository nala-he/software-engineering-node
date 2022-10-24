"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
/**
 * @file Implements mongoose schema in the messages collection
 */
const MessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    sentOn: { type: Date, default: Date.now },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    sentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, { collection: 'messages' });
exports.default = MessageSchema;
//# sourceMappingURL=MessageSchema.js.map