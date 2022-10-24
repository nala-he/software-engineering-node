"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * @file Implements mongoose schema in the bookmarks collection
 */
const bookmarkSchema = new mongoose_1.default.Schema({
    markedTuit: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'TuitModel' },
    markedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
}, { collection: 'bookmarks' });
exports.default = bookmarkSchema;
//# sourceMappingURL=BookmarkSchema.js.map