/**
 * @file Declares Bookmark data type representing relationship between
 * a user and a tuit, as in a user bookmarks a tuit
 */

/**
 * @typedef Bookmark Represents bookmarks relationship between a user
 * and a tuit, as in a user bookmarks a tuit
 * @property {string} markedTuit ID of user who bookmarked
 * @property {string} markedBy ID of tuit that a user bookmarked
 */
export default interface Bookmark {
    markedTuit: string,
    markedBy: string,
};