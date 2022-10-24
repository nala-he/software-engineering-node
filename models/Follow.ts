/**
 * @file Declares Follow data type representing relationship between
 * users, as in a user follows a user
 */

/**
 * @typedef {Follow} Follow Represents follows relationship between users,
 * as in a user follows a user
 * @property {string} following ID of user that a user is following
 * @property {string} followedBy ID of user that a user is followed by
 */
export default class Follow {
    private following: string;
    private followedBy: string;
    constructor(following: string, followedBy: string) {
        this.following = following;
        this.followedBy = followedBy;
    }
};