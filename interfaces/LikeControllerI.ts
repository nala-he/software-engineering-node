import {Request, Response} from "express";

/**
 * @file Declares API for Likes related controller methods
 * @interface
 */
export default interface LikeControllerI {
    findTuitsUserLiked (req: Request, res: Response): void;
    findUsersThatLikedTuit (req: Request, res: Response): void;
    countHowManyLikedTuit (req: Request, res: Response): void;
    userLikesTuit (req: Request, res: Response): void;
    userUnlikesTuit (req: Request, res: Response): void;
};