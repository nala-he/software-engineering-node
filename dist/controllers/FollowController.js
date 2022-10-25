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
const FollowDao_1 = require("../daos/FollowDao");
/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * @implements {FollowControllerI}
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:follower/follows/:followed to create a new follow instance
 *     for two given users</li>
 *     <li>DELETE /api/users/:follower/follows/:followed to remove a follow instances</li>
 *     <li>GET /api/users/:follower/follows to retrieve users a user is following</li>
 *     <li>GET /api/users/:followed/followers to retrieve users a user is followed by</li>
 *     <li>GET /api/users/:uid/:other/followers to retrieve users another user is followed by</li>
 *     <li>GET /api/users/:uid/:other/follows to retrieve users another user is following</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
class FollowController {
    constructor() {
        /**
         * @param {Request} req Represents request from client, including path
         * parameter followed identifying the primary key of a user who is followed
         * and a path parameter follower identifying the primary key of a user who
         * is following
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new follow that was inserted in the
         * database
         */
        this.userFollowsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return FollowController.followDao.userFollowsUser(req.params.followed, req.params.follower)
                .then(follow => res.json(follow));
        });
        /**
         * @param {Request} req Represents request from client, including path
         * parameter followed identifying the primary key of a user who is followed
         * and a path parameter follower identifying the primary key of a user who
         * is following
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.userUnfollowsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return FollowController.followDao.userUnfollowsUser(req.params.followed, req.params.follower)
                .then(status => res.json(status));
        });
        /**
         * Retrieves all users from the database whom a particular user is following
         * and returns an array of users.
         * @param {Request} req Represents request from client, including path parameter
         * follower identifying the primary key of a user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the users objects
         */
        this.findUsersIamFollowing = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return FollowController.followDao.findUsersIamFollowing(req.params.follower)
                .then(followed => res.json(followed));
        });
        /**
         * Retrieves all users from the database who are following a particular user and
         * returns an array of users.
         * @param {Request} req Represents request from client, including path parameter
         * followed identifying the primary key of a user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the users objects
         */
        this.findUsersIamFollowedBy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return FollowController.followDao.findUsersIamFollowedBy(req.params.followed)
                .then(follower => res.json(follower));
        });
        /**
         * Retrieves all users from the database who are following another user
         * and returns an array of users.
         * @param {Request} req Represents request from client, including path parameter
         * uid identifying primary key of the current user and other identifying primary
         * key of another user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the users objects
         */
        this.findUsersAnotherFollowedBy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return FollowController.followDao.findUsersAnotherFollowedBy(req.params.uid, req.params.other)
                .then(followers => res.json(followers));
        });
        /**
         * Retrieves all users from the database who are followed by another user and returns
         * an array of users.
         * @param {Request} req Represents request from client, including path parameter
         * uid and other
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the users objects
         */
        this.findUsersAnotherFollowing = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return FollowController.followDao.findUsersAnotherFollowing(req.params.uid, req.params.other)
                .then(followed => res.json(followed));
        });
    }
}
exports.default = FollowController;
FollowController.followController = null;
FollowController.followDao = FollowDao_1.default.getInstance();
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.post("/api/users/:follower/follows/:followed", FollowController.followController.userFollowsUser);
        app.delete("/api/users/:follower/follows/:followed", FollowController.followController.userUnfollowsUser);
        app.get("/api/users/:follower/follows", FollowController.followController.findUsersIamFollowing);
        app.get("/api/users/:followed/followers", FollowController.followController.findUsersIamFollowedBy);
        app.get("/api/users/:uid/:other/followers", FollowController.followController.findUsersAnotherFollowedBy);
        app.get("/api/users/:uid/:other/follows", FollowController.followController.findUsersAnotherFollowing);
    }
    return FollowController.followController;
};
//# sourceMappingURL=FollowController.js.map