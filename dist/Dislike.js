"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef {Dislike} Dislike Represents dislikes relationship between a user and a tuit,
 * as in a user dislikes a tuit
 * @property {Tuit} tuit Tuit being disliked
 * @property {User} likedBy User disliking the tuit
 */
class Dislike {
    constructor(tuit, dislikedBy) {
        this.tuit = tuit;
        this.dislikedBy = dislikedBy;
    }
}
exports.default = Dislike;
;
//# sourceMappingURL=Dislike.js.map