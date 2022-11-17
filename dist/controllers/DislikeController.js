"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = require("../daos/LikeDao");
const TuitDao_1 = require("../daos/TuitDao");
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
 * @property {LikeDao} dislikeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
class LikeController {
    constructor() {
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findTuitsUserLiked = (req, res) => LikeController.dislikeDao.findTuitsUserLiked(req.params.uid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all users that liked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findUsersThatLikedTuit = (req, res) => LikeController.dislikeDao.findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves number of likes a tuit has from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the count of the liked tuit
         */
        this.countHowManyLikedTuit = (req, res) => LikeController.dislikeDao.countHowManyLikedTuit(req.params.tid)
            .then(count => res.json(count));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new likes that was inserted in the
         * database
         */
        this.userLikesTuit = (req, res) => LikeController.dislikeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(like => res.json(like));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unliking
         * the tuit and the tuit being unliked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the like was successful or not
         */
        this.userUnlikesTuit = (req, res) => LikeController.dislikeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
        /**
         * @param req Represents request from client, including the
         * path parameters uid and tid representing the user that is disliking
         * the tuit and the tuit being disliked
         * @param res Represents response to client, including status
         * on whether dislike status was successful updated or not
         */
        this.userTogglesTuitDislikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            try {
                const userAlreadyLikedTuit = yield LikeController.dislikeDao
                    .findUserLikesTuit(userId, tid);
                const howManyLikedTuit = yield LikeController.dislikeDao
                    .countHowManyLikedTuit(tid);
                const howManyDislikedTuit = yield LikeController.dislikeDao
                    .countHowManyDislikedTuit(tid);
                let tuit = yield LikeController.tuitDao.findTuitById(tid);
                if (userAlreadyLikedTuit) {
                    yield LikeController.dislikeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                else {
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                ;
                yield LikeController.tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
}
exports.default = LikeController;
LikeController.dislikeDao = LikeDao_1.default.getInstance();
LikeController.likeController = null;
LikeController.tuitDao = TuitDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @param tuitController
 * @return LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:uid/likes", LikeController.likeController.findTuitsUserLiked);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findUsersThatLikedTuit);
        app.get("/api/tuits/:tid/likes/count", LikeController.likeController.countHowManyLikedTuit);
        app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:uid/likes/:tid", LikeController.likeController.userUnlikesTuit);
        app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
    }
    return LikeController.likeController;
};
//# sourceMappingURL=DislikeController.js.map