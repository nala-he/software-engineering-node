/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
const mongoose = require('mongoose');
import UserSchema from "./UserSchema";
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;