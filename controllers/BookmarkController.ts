/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarked a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to record that a user unbookmarked a tuit
 *     </li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve tuits a user bookmarked
 *     </li>
 *     <li>GET /api/users/:uid/:other/bookmarks to retrieve tuits another user bookmarked
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks to record that a user unbookmarked all tuits</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks",
                BookmarkController.bookmarkController.findTuitsUserBookmarked);
            app.get("/api/users/:uid/:other/bookmarks",
                BookmarkController.bookmarkController.findTuitsBookmarkedByOther);
            app.delete("/api/users/:uid/bookmarks",
                BookmarkController.bookmarkController.userUnbookmarksAllTuits);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuit and tid representing
     * the tuit to be bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmarks that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));

    /**
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user unbookmarked the tuit and tid representing
     * the tuit to be unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findTuitsUserBookmarked = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findTuitsUserBookmarked(req.params.uid)
            .then(tuits => res.json(tuits));

    /**
     * @param {Request} req Represents request from client, including the path
     * parameter me representing the current user and markedBy representing another user
     * who bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked by
     * another user
     */
    findTuitsBookmarkedByOther = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findTuitsBookmarkedByOther(req.params.uid, req.params.other)
            .then(tuits => res.json(tuits));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user that is unbookmarking
     * all tuits
     * @param {Response} res Represents response to client, including status
     * on whether deleting all bookmarks was successful or not
     */
    userUnbookmarksAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksAllTuits(req.params.uid)
            .then(status => res.json(status));

}