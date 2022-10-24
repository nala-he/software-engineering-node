/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
const mongoose = require('mongoose');
import likeSchema from "./LikeSchema";
const likeModel = mongoose.model("LikesModel", likeSchema);
export default likeModel;
