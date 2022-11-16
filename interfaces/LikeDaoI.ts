import Like from "../models/Like";

/**
 * @file Declares API for Likes related data access object methods
 * @interface
 */
export default interface LikeDaoI {
    findTuitsUserLiked(uid: string): Promise<Like[]>;
    findUsersThatLikedTuit(tid: string): Promise<Like[]>;
    countHowManyLikedTuit(tid: string): Promise<any>;
    userLikesTuit(uid: string, tid: string): Promise<Like>;
    userUnlikesTuit(uid: string, tid: string): Promise<any>;
}
