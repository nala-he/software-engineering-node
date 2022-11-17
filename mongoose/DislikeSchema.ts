const mongoose = require('mongoose');

/**
 * @file Implements mongoose schema in the dislikes collection
 */
const dislikeSchema = new mongoose.Schema({
    dislikedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    dislikedTuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel'}
}, {collection: 'dislikes'});
export default dislikeSchema;