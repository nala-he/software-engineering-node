const mongoose = require('mongoose');

/**
 * @file Implements mongoose schema in the likes collection
 */
const likeSchema = new mongoose.Schema({
    likedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    likedTuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel'}
}, {collection: 'likes'});
export default likeSchema;