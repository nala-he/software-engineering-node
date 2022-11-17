/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeModel from "../mongoose/LikeModel";
import LikeDaoI from "../interfaces/LikeDaoI";
import Like from "../models/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @implements {LikeDaoI}
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to retrieve tuits documents liked by the user from the likes collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the liked tuits are retrieved from
     * database
     */
    findTuitsUserLiked = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate('likedTuit', 'tuit')
            .exec();

    /**
     * Checks if there's a likes document in the database for user/tuit combination
     * @param uid -  User's primary key
     * @param tid - Tuit's primary key
     * @Returns Promise To be notified when user is retrieved from the database
     */
    findUserLikesTuit = async (uid, tid) =>
            LikeModel.findOne({likedTuit: tid, likedBy: uid});

    /**
     * Uses LikeModel to retrieve users documents who liked tuits from likes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({likedTuit: tid})
            .populate('likedTuit')
            .populate('likedBy', 'username')
            .exec();

    /**
     * Uses LikeModel to retrieve count of likedTuit documents from likes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when count is retrieved from the database
     */
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({likedTuit: tid});
    /**
     * Inserts like instance indicating relationship between a user and a tuit
     * into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<Like> =>
        LikeModel.create({likedTuit: tid, likedBy: uid});

    /**
     * Removes like instance indicating relationship between a user and a tuit
     * from the database.
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when like instance is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string) =>
        LikeModel.deleteOne({likedTuit: tid, likedBy: uid});
}
