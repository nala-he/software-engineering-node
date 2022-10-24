import mongoose from "mongoose";
/**
 * @file Implements mongoose schema in the follows collection
 */
const followSchema = new mongoose.Schema({
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    followedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }
}, { collection: 'follows' });
export default followSchema;
