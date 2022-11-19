"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
const mongoose = require('mongoose');
const LikeSchema_1 = require("./LikeSchema");
const likeModel = mongoose.model("LikeModel", LikeSchema_1.default);
exports.default = likeModel;
//# sourceMappingURL=LikeModel.js.map