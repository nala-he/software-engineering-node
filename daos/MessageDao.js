var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao {
    constructor() {
        /**
         * Inserts message instance into the database
         * @param {Message} message Message
         * @returns Promise To be notified when new message is inserted into the database
         */
        this.userSendsMessage = (message) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const messageMongooseModel = yield MessageModel.create(message);
            return new Message((_a = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel.message) !== null && _b !== void 0 ? _b : '', new Date((_c = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel.postedOn) !== null && _c !== void 0 ? _c : (new Date())), (_d = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel.sentBy) !== null && _d !== void 0 ? _d : '', (_e = messageMongooseModel === null || messageMongooseModel === void 0 ? void 0 : messageMongooseModel.sentTo) !== null && _e !== void 0 ? _e : '');
        });
        /**
         * Uses MessageModel to retrieve all sent message documents from messages collection
         * @param {string} sentBy Sender user's primary key
         * @returns Promise To be notified when the messages are retrieved from
         * database
         */
        this.findSentMessages = (sentBy) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel.find({ sentBy })
                .populate('message')
                .populate('message')
                .populate('sentBy', 'username')
                .populate('sentTo', 'username')
                .exec();
        });
        /**
         * Uses MessageModel to retrieve all received message documents from messages collection
         * @param {string} sentTo Receiver user's primary key
         * @returns Promise To be notified when the messages are retrieved from
         * database
         */
        this.findReceivedMessages = (sentTo) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel
                .find({ sentTo })
                .populate('message')
                .populate('sentBy', 'username')
                .populate('sentTo', 'username')
                .exec();
        });
        /**
         * Removes message instance by a receiver from the database.
         * @param {string} sentTo Receiver user's primary key
         * @param {string} mid Message's primary key
         * @returns Promise To be notified when message instance is removed from the database
         */
        this.userDeletesReceivedMessage = (sentTo, mid) => __awaiter(this, void 0, void 0, function* () { return MessageModel.deleteOne({ sentTo, mid }); });
        /**
         * Updates sent message with new values in database by the sender
         * @param {string} sentBy Primary key of the sender user
         * @param {string} mid Primary key of the message to be updated
         * @param {any} message Message content
         * @returns Promise To be notified when message is updated in the database
         */
        this.userUpdatesSentMessage = (sentBy, mid, message) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel
                .updateOne({ sender: sentBy, _id: mid }, { $set: { message: message.message } });
        });
        /**
         * Uses MessageModel to retrieve count of received message documents from
         * messages collection
         * @param {string} sentTo Receiver user's primary key
         * @returns Promise To be notified when count is retrieved from the database
         */
        this.findReceivedMessagesCount = (sentTo) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel
                .find({ sentTo })
                .count();
        });
    }
}
MessageDao.messageDao = null;
/**
 * Creates singleton DAO instance
 * @returns MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
