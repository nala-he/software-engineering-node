import {Request, Response} from "express";
/**
 * @file Declares API for Bookmarks related controller methods
 * @interface
 */
export default interface BookmarkControllerI {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
    findTuitsUserBookmarked(req: Request, res: Response): void;
    findTuitsBookmarkedByOther(req: Request, res: Response): void;
    userUnbookmarksAllTuits(req: Request, res: Response): void;
}