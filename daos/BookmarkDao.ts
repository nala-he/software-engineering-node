/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import Bookmark from "../models/Bookmark";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import bookmarkModel from "../mongoose/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Primary key of user who bookmarks
     * @param {string} tid Primary key of a marked tuit
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        bookmarkModel
            .create({markedBy: uid, markedTuit: tid});

    /**
     * Removes bookmark instance indicating relationship between a user and a tuit
     * from the database.
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like instance is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        bookmarkModel
            .deleteOne({markedBy: uid, markedTuit: tid})

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmarked tuits are retried from the database
     */
    findTuitsUserBookmarked = async (uid: string): Promise<Bookmark[]> =>
        bookmarkModel
            .find({markedBy: uid})
            .populate('markedTuit', 'tuit')
            .populate('markedBy', 'username')
            .exec();

    /**
     * Retrieves all tuits bookmarked by another user not the current user from the database
     * @param {string} me User's primary key
     * @param {string} markedBy Another user's primary key
     * @returns Promise To be notified when bookmarked tuits are retried from the database
     * */
    findTuitsBookmarkedByOther = async (me: string, markedBy: string): Promise<Bookmark[]> =>
        bookmarkModel.find({markedBy: markedBy !== me ? markedBy : null})
            .populate('markedBy', 'username')
            .populate('markedTuit', 'tuit')
            .exec();

    /**
     * Removes all bookmark instances of a user from the database.
     * @param {String} uid Primary key of a user who is unbookmarking all tuits
     * @return Promise To be notified all bookmarks was successful or not
     */
    userUnbookmarksAllTuits = async (uid: string): Promise<any> =>
        bookmarkModel.deleteMany({markedBy: uid});
}
