import Follow from "../models/Follow";
/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser(following: string, followedBy: string): Promise<Follow>;
    userUnfollowsUser(following: string, followedBy: string): Promise<any>;
    findUsersIamFollowing(followedBy: string): Promise<any>;
    findUsersIamFollowedBy(following: string): Promise<any>;
    findUsersAnotherFollowedBy(uid: string, following: string): void;
    findUsersAnotherFollowing(uid: string, followedBy: string): void;
}
