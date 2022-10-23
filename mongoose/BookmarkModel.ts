import mongoose from "mongoose";
import bookmarkSchema from "./BookmarkSchema";
/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
const bookmarkModel = mongoose.model(
    'BookmarkModel', bookmarkSchema);
export default bookmarkModel;