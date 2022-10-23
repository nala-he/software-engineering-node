import Bookmark from "../models/Bookmark";
/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
    findTuitsUserBookmarked(uid: string): Promise<Bookmark[]>;
    findTuitsBookmarkedByOther(uid: string, other: string): Promise<Bookmark[]>;
    userUnbookmarksAllTuits(uid: string): Promise<any>;
}
