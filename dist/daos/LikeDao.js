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
/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
const LikeModel_1 = require("../mongoose/LikeModel");
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
class LikeDao {
    constructor() {
        /**
         * Uses LikeModel to retrieve tuits documents liked by the user from the likes collection
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the liked tuits are retrieved from
         * database
         */
        this.findTuitsUserLiked = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedBy: uid })
                .populate('likedTuit', 'tuit')
                .exec();
        });
        /**
         * Uses LikeModel to retrieve users documents who liked tuits from likes collection
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when users are retrieved from the database
         */
        this.findUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedTuit: tid })
                .populate('likedTuit')
                .populate('likedBy', 'username')
                .exec();
        });
        /**
         * Uses LikeModel to retrieve count of likedTuit documents from likes collection
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when count is retrieved from the database
         */
        this.findTuitLikesCount = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedTuit: tid })
                .count();
        });
        /**
         * Inserts like instance indicating relationship between a user and a tuit
         * into the database
         * @param {string} uid User's primary key
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when like is inserted into the database
         */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ likedTuit: tid, likedBy: uid }); });
        /**
         * Removes like instance indicating relationship between a user and a tuit
         * from the database.
         * @param {string} uid User's primary key
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when like instance is removed from the database
         */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ likedTuit: tid, likedBy: uid }); });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * Creates singleton DAO instance
 * @returns LikeDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
//# sourceMappingURL=LikeDao.js.map