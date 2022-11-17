/**
 * @file Implements mongoose model to CRUD
 * documents in the dislikes collection
 */
const mongoose = require('mongoose');
import dislikeSchema from "./DislikeSchema";

const dislikeModel = mongoose.model("DislikeModel", dislikeSchema);
export default dislikeModel;