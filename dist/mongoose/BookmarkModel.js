"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const BookmarkSchema_1 = require("./BookmarkSchema");
/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
const bookmarkModel = mongoose.model('BookmarkModel', BookmarkSchema_1.default);
exports.default = bookmarkModel;
//# sourceMappingURL=BookmarkModel.js.map