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
const TuitModel_1 = require("../mongoose/TuitModel");
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @implements {TuitDaoI}
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
class TuitDao {
    constructor() {
        /**
         * Uses TuitModel to retrieve all tuit documents from tuits collection
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find()
                .populate("postedBy", "username")
                .exec();
        });
        /**
         * Uses TuitModel to retrieve tuit documents from tuits collection based on a
         * given user id
         * @returns Promise To be notified when the tuits are retrieved from database
         */
        this.findTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.find({ postedBy: uid })
                .populate("postedBy", "username")
                .exec();
        });
        /**
         * Uses TuitModel to retrieve a tuit document from tuits collection based on a
         * given tuit id
         * @returns Promise To be notified when the tuit is retrieved from database
         */
        this.findTuitById = (tid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.findById(tid)
                .exec();
        });
        /**
         * Inserts tuit instance into the database
         * @param {string} uid Id of user who creates the tuit
         * @param {Tuit} tuit Instance to be inserted into the database
         * @returns Promise To be notified when tuit is inserted into the database
         */
        this.createTuitByUser = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid })); });
        /**
         * Update stats info for tuits
         * @param tid Primary key of tuit to be updated
         * @param newStats newStats object
         * @returns Promise To be notified when tuit is updated
         */
        this.updateLikes = (tid, newStats) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
    }
    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {any} tuit Tuit content
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates singleton DAO instance
 * @returns TuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
//# sourceMappingURL=TuitDao.js.map