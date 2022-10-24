"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
const mongoose_1 = require("mongoose");
const LikeSchema_1 = require("./LikeSchema");
const likeModel = mongoose_1.default.model("LikesModel", LikeSchema_1.default);
exports.default = likeModel;
//# sourceMappingURL=LikeModel.js.map