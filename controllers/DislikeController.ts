/**
 * @file Controller RESTful Web service API for dislikes resource
 */
import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/DislikeControllerI";
import TuitDao from "../daos/TuitDao";

/**
 * @class DislikeController Implements RESTful Web service API for dislikes resource.
 * @implements {DislikeControllerI}
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that liked a tuit
 *     </li>
 *     <li>GET /api/tuits/:tid/dislikes/count to retrieve the number count of dislikes a tuit has
 *     </li>
 *     <li>POST /api/users/:uid/dislikes/:tid to record that a user dislikes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/undislikes/:tid to record that a user
 *     no longer dislikes a tuit
 *     </li>
 *     <li>PUT /api/users/:uid/dislikes/:tid to record the like status as
 *     a user toggles the like button
 *     </li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static dislikeController: DislikeController | null = null
    private static tuitDao: TuitDao = TuitDao.getInstance();
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @param tuitController
     * @return DislikeController
     */
    public static getInstance = (app: Express): DislikeController => {
        if(DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findTuitsUserLiked);
            app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findUsersThatLikedTuit);
            app.get("/api/tuits/:tid/dislikes/count",
                DislikeController.dislikeController.countHowManyDislikedTuit);
            app.post("/api/users/:uid/dislikes/:tid",
                DislikeController.dislikeController.userDislikesTuit);
            app.delete("/api/users/:uid/undislikes/:tid",
                DislikeController.dislikeController.userUndislikesTuit);
            app.put("/api/users/:uid/dislikes/:tid",
                DislikeController.dislikeController.userTogglesTuitDislikes);
        }
        return DislikeController.dislikeController;
    }

    private constructor() {}

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findTuitsUserLiked = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findTuitsUserLiked(req.params.uid)
            .then(dislikes => res.json(dislikes));

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersThatLikedTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findUsersThatLikedTuit(req.params.tid)
            .then(dislikes => res.json(dislikes));

    /**
     * Retrieves number of dislikes a tuit has from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the count of the liked tuit
     */
    countHowManyLikedTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.countHowManyLikedTuit(req.params.tid)
            .then(count => res.json(count));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(like => res.json(like));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is undisliking
     * the tuit and the tuit being undisliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the dislike was successful or not
     */
    userUndislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * @param req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking
     * the tuit and the tuit being disliked
     * @param res Represents response to client, including status
     * on whether dislike status was successful updated or not
     */
    userTogglesTuitDislikes = async (req, res) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);

            const howManyDislikedTuit = await DislikeController.dislikeDao
                .countHowManyDislikedTuit(tid);
            let tuit = await DislikeController.tuitDao.findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await DislikeController.dislikeDao.userUnlikesTuit(userId, tid);
                tuit.stats.dislikes = howManyLikedTuit - 1;
                tuit.stats.dislikes = howManyDislikedTuit + 1;
            } else {
                tuit.stats.dislikes = howManyDislikedTuit + 1;
            };
            await DislikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
}

