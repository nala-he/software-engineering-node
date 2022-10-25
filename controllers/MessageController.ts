/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * @implements {MessageControllerI}
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:sender/messages/:receiver to record a message from a user to another
 *     </li>
 *     <li>GET /api/users/:sender/outbox to retrieve all sent messages by a user
 *     </li>
 *     <li>GET /api/users/:receiver/inbox to retrieve all received messages of a user
 *     </li>
 *     <li>DELETE /api/users/:receiver/messages/:mid to remove a record of message by a receiver
 *     </li>
 *     <li>PUT /api/users/:sender/messages/:mid to modify a message instance by a sender
 *     </li>
 *     <li>GET /api/users/:receiver/inbox/count to retrieve the number count of a user's
 *     received message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:sender/messages/:receiver",
                MessageController.messageController.userSendsMessage);
            app.get("/api/users/:sender/outbox",
                MessageController.messageController.findSentMessages);
            app.get("/api/users/:receiver/inbox",
                MessageController.messageController.findReceivedMessages);
            app.delete("/api/users/:receiver/messages/:mid",
                MessageController.messageController.userDeletesReceivedMessage);
            app.put('/api/users/:sender/messages/:mid',
                MessageController.messageController.userUpdatesSentMessage);
            app.get('/api/users/:receiver/inbox/count',
                MessageController.messageController.findReceivedMessagesCount);

        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including body containing the JSON
     * object for the new message to be inserted to the database and path parameter sender and
     * receiver identifying the primary key of the sender user and receiver user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsMessage = async (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(
            req.params.sender,
            req.params.receiver,
            req.body
        ).then(message => res.json(message));

    /**
     * Retrieves all sent messages from the database for a sender user and returns
     * an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findSentMessages = async (req: Request, res: Response) =>
        MessageController.messageDao.findSentMessages(req.params.sender)
            .then(messages => res.json(messages));

    /**
     * Retrieves all received messages from the database for a receiver user and returns
     * an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findReceivedMessages = async (req: Request, res: Response) =>
        MessageController.messageDao.findReceivedMessages(req.params.receiver)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter receiver identifying the primary key of the receiver user
     * and mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message by a receiver was successful or not
     */
    userDeletesReceivedMessage = async (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesReceivedMessage(req.params.receiver, req.params.mid)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter sender identifying the primary key of the sender user and mid
     * identifying the primary key of the message to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a message by a sender was successful or not
     */
    userUpdatesSentMessage = async (req: Request, res: Response) =>
        MessageController.messageDao.userUpdatesSentMessage(req.params.sender, req.params.mid,
            req.body)
            .then(status => res.json(status));

    /**
     * Retrieves number of received messages from the database
     * @param {Request} req Represents request from client, including the path
     * parameter receiver representing the receiver user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the count of the received messages
     */
    findReceivedMessagesCount = async (req: Request, res: Response) =>
        MessageController.messageDao.findReceivedMessagesCount(req.params.receiver)
            .then(count => res.json(count));
}