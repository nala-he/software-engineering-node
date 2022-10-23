/**
 * @file Declares Follow data type representing relationship between
 * users, as in a user follows a user
 */

/**
 * @typedef Follow Represents follows relationship between users,
 * as in a user follows a user
 * @property {string} following ID of user that a user is following
 * @property {string} followedBy ID of user that a user is followed by
 */
export default interface Follow {
    following: string,
    followedBy: string
};