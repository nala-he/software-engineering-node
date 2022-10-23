import mongoose from "mongoose";
/**
 * @file Implements mongoose schema in the messages collection
 */
const MessageSchema = new mongoose.Schema ({
    message: {type: String, required: true},
    sentOn: {type: Date, default: Date.now},
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'},
    sentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'}
}, {collection: 'messages'});

export default MessageSchema;