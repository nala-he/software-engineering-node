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
const FollowModel_1 = require("../mongoose/FollowModel");
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @implements {FollowDaoI}
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * Inserts follow instance indicating users' following and followedBy relationship
         * into the database
         * @param {string} following Primary key of user a user is following
         * @param {string} followedBy Primary key of user who is following a user
         * @returns Promise To be notified when follow is inserted into the database
         */
        this.userFollowsUser = (following, followedBy) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ following: following, followedBy: followedBy }); });
        /**
         * Removes follow instance indicating users' following and followedBy relationship
         * into the database
         * @param {string} following User ID of user a user is following
         * @param {string} followedBy User ID of user who is following a user
         * @returns Promise To be notified when follow is removed from the database
         */
        this.userUnfollowsUser = (following, followedBy) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ following, followedBy }); });
        /**
         * Uses FollowModel to retrieve followedBy users documents from follows collection
         * @param {string} followedBy User's primary key
         * @returns Promise To be notified when users are retrieved from the database
         */
        this.findUsersIamFollowing = (followedBy) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ followedBy })
                .populate('following', 'username')
                .populate('followedBy', 'username')
                .exec();
        });
        /**
         * Uses FollowModel to retrieve following users documents from follows collection
         * @param {string} followedBy User's primary key
         * @returns Promise To be notified when users are retrieved from the database
         */
        this.findUsersIamFollowedBy = (following) => __awaiter(this, void 0, void 0, function* () {
            const users = yield FollowModel_1.default
                .find({ following })
                .populate('followedBy', 'username')
                .populate('following', 'username');
            return users;
        });
        /**
         * Uses FollowModel to retrieve following users documents of another user from follows collection
         * @param {string} uid User's primary key
         * @param {string} following Followed user's primary key
         * @returns Promise To be notified when users are retrieved from the database
         */
        this.findUsersAnotherFollowedBy = (uid, following) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ following: following !== uid ? following : null })
                .populate('following', 'username')
                .populate('followedBy', 'username')
                .exec();
        });
        /**
         * Uses FollowModel to retrieve followed users documents of another user from follows collection
         * @param {string} uid User's primary key
         * @param {string} followedBy Following user's primary key
         * @returns Promise To be notified when users are retrieved from the database
         */
        this.findUsersAnotherFollowing = (uid, followedBy) => __awaiter(this, void 0, void 0, function* () {
            const users = yield FollowModel_1.default
                .find({ followedBy: followedBy !== uid ? followedBy : null })
                .populate('followedBy', 'username')
                .populate('following', 'username');
            return users;
        });
    }
}
exports.default = FollowDao;
FollowDao.likeDao = null;
/**
 * Creates singleton DAO instance
 * @returns LikeDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.likeDao === null) {
        FollowDao.likeDao = new FollowDao();
    }
    return FollowDao.likeDao;
};
//# sourceMappingURL=FollowDao.js.map