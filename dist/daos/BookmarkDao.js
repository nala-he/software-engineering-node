"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkModel_1 = require("../mongoose/BookmarkModel");
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @implements {BookmarkDaoI}
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * Inserts bookmark instance into the database
         * @param {string} uid Primary key of user who bookmarks
         * @param {string} tid Primary key of a marked tuit
         * @returns Promise To be notified when bookmark is inserted into the database
         */
        this.userBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .create({ markedBy: uid, markedTuit: tid });
        });
        /**
         * Removes bookmark instance indicating relationship between a user and a tuit
         * from the database.
         * @param {string} uid User's primary key
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when like instance is removed from the database
         */
        this.userUnbookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .deleteOne({ markedBy: uid, markedTuit: tid });
        });
        /**
         * Retrieves all tuits bookmarked by a user from the database
         * @param {string} uid User's primary key
         * @returns Promise To be notified when bookmarked tuits are retried from the database
         */
        this.findTuitsUserBookmarked = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ markedBy: uid })
                .populate('markedTuit', 'tuit')
                .populate('markedBy', 'username')
                .exec();
        });
        /**
         * Retrieves all tuits bookmarked by another user not the current user from the database
         * @param {string} me User's primary key
         * @param {string} markedBy Another user's primary key
         * @returns Promise To be notified when bookmarked tuits are retried from the database
         * */
        this.findTuitsBookmarkedByOther = (me, markedBy) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default.find({ markedBy: markedBy !== me ? markedBy : null })
                .populate('markedBy', 'username')
                .populate('markedTuit', 'tuit')
                .exec();
        });
        /**
         * Removes all bookmark instances of a user from the database.
         * @param {String} uid Primary key of a user who is unbookmarking all tuits
         * @return Promise To be notified all bookmarks was successful or not
         */
        this.userUnbookmarksAllTuits = (uid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteMany({ markedBy: uid }); });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates singleton DAO instance
 * @returns BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
//# sourceMappingURL=BookmarkDao.js.map