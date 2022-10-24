"use strict";
/**
 * @file Declares Message data type
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Message Represents a message
 * @property {string} id Message id
 * @property {string} message Message content
 * @property {Date} sentOn Sent date
 * @property {string} sentBy Sent user id
 * @property {string} sentTo Received user id
 */
class Message {
    constructor(id, message, sentOn, sentBy, sentTo) {
        this.id = id;
        this.message = message;
        this.sentOn = sentOn;
        this.sentBy = sentBy;
        this.sentTo = sentTo;
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map