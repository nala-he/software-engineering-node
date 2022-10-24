"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose model to CRUD
 * documents in the tuits collection
 */
const mongoose_1 = require("mongoose");
const TuitSchema_1 = require("./TuitSchema");
const TuitModel = mongoose_1.default.model('TuitModel', TuitSchema_1.default);
exports.default = TuitModel;
//# sourceMappingURL=TuitModel.js.map