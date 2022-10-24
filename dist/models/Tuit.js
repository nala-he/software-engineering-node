"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef {Tuit} Tuit Represents a tuit
 * @property {string} id Tuit id
 * @property {string} tuit Tuit content
 * @property {Date} postedOn Posted date
 * @property {User} postedBy Posted user
 */
class Tuit {
    constructor(id, tuit, postedOn, postedBy) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = postedBy;
    }
}
exports.default = Tuit;
//# sourceMappingURL=Tuit.js.map