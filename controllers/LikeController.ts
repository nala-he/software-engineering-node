/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import TuitDao from "../daos/TuitDao";
import DislikeController from "./DislikeController";
import DislikeDao from "../daos/DislikeDao";

/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * @implements {LikeControllerI}
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>GET /api/tuits/:tid/likes/count to retrieve the number count of likes a tuit has
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit
 *     </li>
 *     <li>PUT /api/users/:uid/unlikes/:tid to record the like status as
 *     a user toggles the like button
 *     </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @param tuitController
     * @return LikeController
     */
    public static getInstance = (app: Express): LikeController => {
        if(LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findTuitsUserLiked);
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findUsersThatLikedTuit);
            app.get("/api/tuits/:tid/likes/count",
                LikeController.likeController.countHowManyLikedTuit);
            app.post("/api/users/:uid/likes/:tid",
                LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/likes/:tid",
                LikeController.likeController.userUnlikesTuit);
            app.put("/api/users/:uid/likes/:tid",
                LikeController.likeController.userTogglesTuitLikes);
        }
        return LikeController.likeController;
    }

    private constructor() {}

    /**
     * Retrieves all tuits liked by a user from the database
     * @param req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    // findTuitsUserLiked = (req: Request, res: Response) =>
    //     LikeController.likeDao.findTuitsUserLiked(req.params.uid)
    //         .then(likes => res.json(likes));
    findTuitsUserLiked = (req, res) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        LikeController.likeDao.findTuitsUserLiked(userId)
            .then(likes => {
                console.log(likes);

                const likesNonNullTuits =
                    likes.filter(like => like.tuit);
                const tuitsFromLikes =
                    likesNonNullTuits.map(like => like.tuit);
                // console.log(tuitsFromLikes);
                res.json(tuitsFromLikes);
            });
    }

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves number of likes a tuit has from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the count of the liked tuit
     */
    countHowManyLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.countHowManyLikedTuit(req.params.tid)
            .then(count => res.json(count));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(like => res.json(like));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * @param req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking
     * the tuit and the tuit being liked
     * @param res Represents response to client, including status
     * on whether like status was successful updated or not
     */
    userTogglesTuitLikes = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .countHowManyLikedTuit(tid);
            const howManyDislikedTuit = await LikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);

            if (userAlreadyLikedTuit) {
                // decrease likes, unlike
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else {
                // like and increase likes, undislike and decrease dislikes,
                await LikeController.likeDao.userLikesTuit(userId, tid);
                await LikeController.dislikeDao.userUndislikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
                tuit.stats.dislikes = (howManyDislikedTuit - 1) < 0 ? 0 : (howManyDislikedTuit - 1);
            }
            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
}

