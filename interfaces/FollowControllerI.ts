import {Request, Response} from "express";
/**
 * @file Declares API for Follows related controller methods
 */
export default interface FollowControllerI {
    userFollowsUser(req: Request, res: Response): void;
    userUnfollowsUser(req: Request, res: Response): void;
    findUsersIamFollowing(req: Request, res: Response): void;
    findUsersIamFollowedBy(req: Request, res: Response): void;
    findUsersAnotherFollowedBy(req: Request, res: Response): void;
    findUsersAnotherFollowing(req: Request, res: Response): void;
};