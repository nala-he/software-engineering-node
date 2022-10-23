/**
 * @file Implements mongoose model to CRUD
 * documents in the follows collection
 */
import mongoose from "mongoose";
import followSchema from "./FollowSchema";

const followModel = mongoose.model(
    'FollowModel', followSchema);
export default followModel;
