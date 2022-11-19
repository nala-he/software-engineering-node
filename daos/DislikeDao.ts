/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import Dislike from "../models/Dislike";
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/DislikeModel";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @implements {DislikeDaoI}
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DisikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    /**
     * Uses DislikeModel to retrieve tuits documents disliked by the user from the
     * dislikes collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the disliked tuits are retrieved from
     * database
     */
    findTuitsUserDisliked = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate('dislikedTuit', 'tuit')
            .exec();

    /**
     * Checks if there's a dislikes document in the database for user/tuit combination
     * @param uid -  User's primary key
     * @param tid - Tuit's primary key
     * @Returns Promise To be notified when user is retrieved from the database
     */
    findUserDislikesTuit = async (uid, tid) =>
        DislikeModel.findOne({dislikedTuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeModel to retrieve count of dislikedTuit documents from likes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when count is retrieved from the database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({dislikedTuit: tid});

    /**
     * Inserts dislike instance indicating relationship between a user and a tuit
     * into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({dislikedTuit: tid, dislikedBy: uid});

    /**
     * Removes dislike instance indicating relationship between a user and a tuit
     * from the database.
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike instance is removed from the database
     */
    userUndislikesTuit = async (uid: string, tid: string) =>
        DislikeModel.deleteOne({dislikedTuit: tid, dislikedBy: uid});
}