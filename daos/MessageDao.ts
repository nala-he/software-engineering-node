/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Inserts message instance into the database
     * @param {string} sentBy Sender
     * @param {string} sentTo Receiver
     * @param {Message} message Message
     * @returns Promise To be notified when new message is inserted into the database
     */
    userSendsMessage = async (sentBy: string, sentTo: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, sentBy, sentTo});



    /**
     * Uses MessageModel to retrieve all sent message documents from messages collection
     * @param {string} sentBy Sender user's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findSentMessages = async (sentBy: string): Promise<Message[]> =>
        MessageModel.find({sentBy})
            .populate('message')
            .populate('message')
            .populate('sentBy', 'username')
            .populate('sentTo', 'username')
            .exec();

    /**
     * Uses MessageModel to retrieve all received message documents from messages collection
     * @param {string} sentTo Receiver user's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findReceivedMessages = async (sentTo: string): Promise<Message[]> =>
        MessageModel
            .find({sentTo})
            .populate('message')
            .populate('sentBy', 'username')
            .populate('sentTo', 'username')
            .exec();

    /**
     * Removes message instance by a receiver from the database.
     * @param {string} sentTo Receiver user's primary key
     * @param {string} mid Message's primary key
     * @returns Promise To be notified when message instance is removed from the database
     */
    userDeletesReceivedMessage = async (sentTo: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({sentTo, mid});

    /**
     * Updates sent message with new values in database by the sender
     * @param {string} sentBy Primary key of the sender user
     * @param {string} mid Primary key of the message to be updated
     * @param {any} message Message content
     * @returns Promise To be notified when message is updated in the database
     */
    userUpdatesSentMessage = async (sentBy: string, mid: string, message: any): Promise<any> =>
        MessageModel
            .updateOne({sender: sentBy, _id: mid}, {$set: {message: message.message}});

    /**
     * Uses MessageModel to retrieve count of received message documents from
     * messages collection
     * @param {string} sentTo Receiver user's primary key
     * @returns Promise To be notified when count is retrieved from the database
     */
    findReceivedMessagesCount = async (sentTo: string): Promise<any> =>
        MessageModel
            .find({sentTo})
            .count();
}