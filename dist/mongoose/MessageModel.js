"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the messages collection
 */
const mongoose = require('mongoose');
const MessageSchema_1 = require("./MessageSchema");
const MessageModel = mongoose.model('MessageModel', MessageSchema_1.default);
exports.default = MessageModel;
//# sourceMappingURL=MessageModel.js.map