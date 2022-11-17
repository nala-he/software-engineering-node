import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef {Dislike} Dislike Represents dislikes relationship between a user and a tuit,
 * as in a user dislikes a tuit
 * @property {Tuit} tuit Tuit being disliked
 * @property {User} likedBy User disliking the tuit
 */
export default class Dislike {
    private tuit: Tuit;
    private dislikedBy: User;

    constructor(tuit: Tuit, dislikedBy: User) {
        this.tuit = tuit;
        this.dislikedBy = dislikedBy;
    }
};