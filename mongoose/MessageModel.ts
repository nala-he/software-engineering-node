/**
 * @file Implements mongoose model to CRUD
 * documents in the messages collection
 */
const mongoose = require('mongoose');
import messageSchema from "./MessageSchema";
const MessageModel = mongoose.model('MessageModel', messageSchema)
export default MessageModel;