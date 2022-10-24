"use strict";
/**
 * @file Declares Bookmark data type representing relationship between
 * a user and a tuit, as in a user bookmarks a tuit
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Bookmark Represents bookmarks relationship between a user
 * and a tuit, as in a user bookmarks a tuit
 * @property {string} markedTuit ID of user who bookmarked
 * @property {string} markedBy ID of tuit that a user bookmarked
 */
class Bookmark {
    constructor(markedTuit, markedBy) {
        this.markedTuit = markedTuit;
        this.markedBy = markedBy;
    }
}
exports.default = Bookmark;
;
//# sourceMappingURL=Bookmark.js.map