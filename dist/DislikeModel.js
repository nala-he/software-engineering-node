"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the dislikes collection
 */
const mongoose = require('mongoose');
const DislikeSchema_1 = require("./DislikeSchema");
const dislikeModel = mongoose.model("DislikeModel", DislikeSchema_1.default);
exports.default = dislikeModel;
//# sourceMappingURL=DislikeModel.js.map