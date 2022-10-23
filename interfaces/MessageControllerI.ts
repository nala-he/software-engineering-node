import {Request, Response} from "express";

/**
 * @file Declares API for Messages related controller methods
 */
export default interface MessageControllerI {
    userSendsMessage(req: Request, res: Response): void;
    findSentMessages(req: Request, res: Response): void;
    findReceivedMessages(req: Request, res: Response): void;
    userDeletesReceivedMessage(req: Request, res: Response): void;
    userUpdatesSentMessage(req: Request, res: Response): void;
    findReceivedMessagesCount(req: Request, res: Response): void;
}
