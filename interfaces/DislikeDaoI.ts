import Dislike from "../models/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 * @interface
 */
export default interface DislikeDaoI {
    findTuitsUserDisliked(uid: string): Promise<Dislike[]>;
    findUserDislikesTuit(uid: string, tid: string): Promise<any>;
    countHowManyDislikedTuit(tid: string): Promise<any>;
    userDislikesTuit(uid: string, tid: string): Promise<any>;
    userUndislikesTuit(uid: string, tid: string): Promise<any>;
}
