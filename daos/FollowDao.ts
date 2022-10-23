/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import followModel from "../mongoose/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static likeDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.likeDao === null) {
            FollowDao.likeDao = new FollowDao();
        }
        return FollowDao.likeDao;
    }

    private constructor() {}

    /**
     * Inserts follow instance indicating users' following and followedBy relationship
     * into the database
     * @param {string} following Primary key of user a user is following
     * @param {string} followedBy Primary key of user who is following a user
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsUser = async (following: string, followedBy: string): Promise<Follow> =>
        followModel.create({following: following, followedBy: followedBy});

    /**
     * Removes follow instance indicating users' following and followedBy relationship
     * into the database
     * @param {string} following User ID of user a user is following
     * @param {string} followedBy User ID of user who is following a user
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsUser = async (following: string, followedBy: string): Promise<any> =>
        followModel.deleteOne({following, followedBy});

    /**
     * Uses FollowModel to retrieve followedBy users documents from follows collection
     * @param {string} followedBy User's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findUsersIamFollowing = async (followedBy: string): Promise<any> =>
        followModel
            .find({followedBy})
            .populate('following','username')
            .populate('followedBy', 'username')
            .exec();

    /**
     * Uses FollowModel to retrieve following users documents from follows collection
     * @param {string} followedBy User's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findUsersIamFollowedBy = async (following: string) => {
        const users = await followModel
            .find({following})
            .populate('followedBy', 'username')
            .populate('following', 'username');
        return users;
    }

    /**
     * Uses FollowModel to retrieve following users documents of another user from follows collection
     * @param {string} uid User's primary key
     * @param {string} following Followed user's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findUsersAnotherFollowedBy = async (uid: string, following: string): Promise<any> =>
        followModel
            .find({following: following !== uid ? following : null})
            .populate('following','username')
            .populate('followedBy', 'username')
            .exec();

    /**
     * Uses FollowModel to retrieve followed users documents of another user from follows collection
     * @param {string} uid User's primary key
     * @param {string} followedBy Following user's primary key
     * @returns Promise To be notified when users are retrieved from the database
     */
    findUsersAnotherFollowing = async (uid: string, followedBy: string) => {
        const users = await followModel
            .find({followedBy: followedBy !== uid ? followedBy : null})
            .populate('followedBy','username')
            .populate('following', 'username');
        return users;
    }
}
