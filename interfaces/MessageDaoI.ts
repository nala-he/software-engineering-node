import Message from "../models/Message";
/**
 * @file Declares API for Messages related data access object methods
 * @interface
 */
export default interface MessageDaoI {
    userSendsMessage(sentBy: string, sentTo: string, message: Message): Promise<Message>;
    findSentMessages(sentBy: string): Promise<Message[]>;
    findReceivedMessages(sentTo: string): Promise<Message[]>;
    userDeletesReceivedMessage(sentTo: string, mid: string): Promise<any>;
    userUpdatesSentMessage(sentBy: string, mid: string, message: string): Promise<any>;
    findReceivedMessagesCount(sentTo: string): Promise<any>;
}
