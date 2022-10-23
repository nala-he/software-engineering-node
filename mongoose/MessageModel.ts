/**
 * @file Implements mongoose model to CRUD
 * documents in the messages collection
 */
import mongoose from "mongoose";
import messageSchema from "./MessageSchema";
const MessageModel = mongoose.model('MessageModel', messageSchema)
export default MessageModel;