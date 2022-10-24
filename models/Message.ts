/**
 * @file Declares Message data type
 */

/**
 * @typedef {Message} Message Represents a message
 * @property {string} id Message id
 * @property {string} message Message content
 * @property {Date} sentOn Sent date
 * @property {string} sentBy Sent user id
 * @property {string} sentTo Received user id
 */
export default class Message {
    private id: string;
    private message: string;
    private sentOn: Date;
    private sentBy: string;
    private sentTo: string;

    constructor(id: string, message: string, sentOn: Date, sentBy: string, sentTo: string) {
        this.id = id;
        this.message = message;
        this.sentOn = sentOn;
        this.sentBy = sentBy;
        this.sentTo = sentTo;
    }
}