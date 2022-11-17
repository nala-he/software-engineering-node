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
const DislikeDao_1 = require("../daos/DislikeDao");
const TuitDao_1 = require("../daos/TuitDao");
/**
 * @class DislikeController Implements RESTful Web service API for dislikes resource.
 * @implements {DislikeControllerI}
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits disliked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that disliked a tuit
 *     </li>
 *     <li>GET /api/tuits/:tid/dislikes/count to retrieve the number count of dislikes a tuit has
 *     </li>
 *     <li>POST /api/users/:uid/dislikes/:tid to record that a user dislikes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/undislikes/:tid to record that a user
 *     no longer dislikes a tuit
 *     </li>
 *     <li>PUT /api/users/:uid/dislikes/:tid to record the dislike status as
 *     a user toggles the dislike button
 *     </li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
class DislikeController {
    constructor() {
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findTuitsUserDisliked = (req, res) => DislikeController.dislikeDao.findTuitsUserDisliked(req.params.uid)
            .then(dislikes => res.json(dislikes));
        /**
         * Retrieves number of dislikes a tuit has from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the count of the liked tuit
         */
        this.countHowManyDislikedTuit = (req, res) => DislikeController.dislikeDao.countHowManyDislikedTuit(req.params.tid)
            .then(count => res.json(count));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new dislikes that was inserted in the
         * database
         */
        this.userDislikesTuit = (req, res) => DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then(like => res.json(like));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is undisliking
         * the tuit and the tuit being undisliked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the dislike was successful or not
         */
        this.userUndislikesTuit = (req, res) => DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
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
                const userAlreadyDislikedTuit = yield DislikeController.dislikeDao
                    .findUserDislikesTuit(userId, tid);
                const howManyDislikedTuit = yield DislikeController.dislikeDao
                    .countHowManyDislikedTuit(tid);
                let tuit = yield DislikeController.tuitDao.findTuitById(tid);
                if (userAlreadyDislikedTuit) {
                    yield DislikeController.dislikeDao.userUndislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                    tuit.stats.likes += 1;
                }
                else {
                    yield DislikeController.dislikeDao.userDislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                    tuit.stats.likes -= 1;
                }
                ;
                yield DislikeController.tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    findUserDislikesTuit(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.default = DislikeController;
DislikeController.dislikeDao = DislikeDao_1.default.getInstance();
DislikeController.dislikeController = null;
DislikeController.tuitDao = TuitDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @param tuitController
 * @return DislikeController
 */
DislikeController.getInstance = (app) => {
    if (DislikeController.dislikeController === null) {
        DislikeController.dislikeController = new DislikeController();
        app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findTuitsUserDisliked);
        app.get("/api/tuits/:tid/dislikes/count", DislikeController.dislikeController.countHowManyDislikedTuit);
        app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
        app.delete("/api/users/:uid/undislikes/:tid", DislikeController.dislikeController.userUndislikesTuit);
        app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
    }
    return DislikeController.dislikeController;
};
//# sourceMappingURL=DislikeController.js.map