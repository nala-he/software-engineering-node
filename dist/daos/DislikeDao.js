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
const DislikeModel_1 = require("../mongoose/DislikeModel");
/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @implements {DislikeDaoI}
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
class DislikeDao {
    constructor() {
        /**
         * Uses DislikeModel to retrieve tuits documents disliked by the user from the
         * dislikes collection
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the disliked tuits are retrieved from
         * database
         */
        this.findTuitsUserDisliked = (uid) => __awaiter(this, void 0, void 0, function* () {
            return DislikeModel_1.default
                .find({ dislikedBy: uid })
                .populate('dislikedTuit', 'tuit')
                .exec();
        });
        /**
         * Checks if there's a dislikes document in the database for user/tuit combination
         * @param uid -  User's primary key
         * @param tid - Tuit's primary key
         * @Returns Promise To be notified when user is retrieved from the database
         */
        this.findUserDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.findOne({ dislikedTuit: tid, dislikedBy: uid }); });
        /**
         * Uses DislikeModel to retrieve count of dislikedTuit documents from likes collection
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when count is retrieved from the database
         */
        this.countHowManyDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.count({ dislikedTuit: tid }); });
        /**
         * Inserts dislike instance indicating relationship between a user and a tuit
         * into the database
         * @param {string} uid User's primary key
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when dislike is inserted into the database
         */
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.create({ dislikedTuit: tid, dislikedBy: uid }); });
        /**
         * Removes dislike instance indicating relationship between a user and a tuit
         * from the database.
         * @param {string} uid User's primary key
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when dislike instance is removed from the database
         */
        this.userUndislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.deleteOne({ dislikedTuit: tid, dislikedBy: uid }); });
    }
}
exports.default = DislikeDao;
DislikeDao.dislikeDao = null;
/**
 * Creates singleton DAO instance
 * @returns DisikeDao
 */
DislikeDao.getInstance = () => {
    if (DislikeDao.dislikeDao === null) {
        DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
};
//# sourceMappingURL=DislikeDao.js.map