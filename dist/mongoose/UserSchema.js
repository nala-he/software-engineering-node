"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
/**
 * @file Implements mongoose schema in the users collection
 */
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: { type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL'] },
    maritalStatus: { type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED'] },
    biography: String,
    dateOfBirth: Date,
    joined: { type: Date, default: Date.now },
    location: {
        latitude: { type: Number, default: 0.0 },
        longitude: { type: Number, default: 0.0 },
    }
}, { collection: 'users' });
exports.default = UserSchema;
//# sourceMappingURL=UserSchema.js.map