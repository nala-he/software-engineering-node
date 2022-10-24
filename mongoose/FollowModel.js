/**
 * @file Implements mongoose model to CRUD
 * documents in the follows collection
 */
const mongoose = require('mongoose');
import followSchema from "./FollowSchema";
const followModel = mongoose.model('FollowModel', followSchema);
export default followModel;
