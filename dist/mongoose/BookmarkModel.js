"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookmarkSchema_1 = require("./BookmarkSchema");
/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
const bookmarkModel = mongoose_1.default.model('BookmarkModel', BookmarkSchema_1.default);
exports.default = bookmarkModel;
//# sourceMappingURL=BookmarkModel.js.map