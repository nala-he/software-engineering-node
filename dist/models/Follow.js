"use strict";
/**
 * @file Declares Follow data type representing relationship between
 * users, as in a user follows a user
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef {Follow} Follow Represents follows relationship between users,
 * as in a user follows a user
 * @property {string} following ID of user that a user is following
 * @property {string} followedBy ID of user that a user is followed by
 */
class Follow {
    constructor(following, followedBy) {
        this.following = following;
        this.followedBy = followedBy;
    }
}
exports.default = Follow;
;
//# sourceMappingURL=Follow.js.map