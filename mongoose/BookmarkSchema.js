import mongoose from "mongoose";
/**
 * @file Implements mongoose schema in the bookmarks collection
 */
const bookmarkSchema = new mongoose.Schema({
    markedTuit: { type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel' },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
}, { collection: 'bookmarks' });
export default bookmarkSchema;
