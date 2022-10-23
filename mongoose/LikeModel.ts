/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import likeSchema from "./LikeSchema";

const likeModel = mongoose.model("LikesModel", likeSchema);
export default likeModel;