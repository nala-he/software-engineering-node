import {Request, Response} from "express";

/**
 * @file Declares API for Dislikes related controller methods
 * @interface
 */
export default interface DislikeControllerI {
    findTuitsUserDisliked (req: Request, res: Response): void;
    findUserDislikesTuit (req: Request, res: Response): void;
    countHowManyDislikedTuit (req: Request, res: Response): void;
    userDislikesTuit (req: Request, res: Response): void;
    userUndislikesTuit (req: Request, res: Response): void;
};