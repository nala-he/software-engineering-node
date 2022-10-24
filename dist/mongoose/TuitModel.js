"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the tuits collection
 */
const mongoose = require('mongoose');
const TuitSchema_1 = require("./TuitSchema");
const TuitModel = mongoose.model('TuitModel', TuitSchema_1.default);
exports.default = TuitModel;
//# sourceMappingURL=TuitModel.js.map