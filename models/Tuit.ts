/**
 * @file Declares Tuit data type
 */
import User from "./User"


/**
 * @typedef Tuit Represents a tuit
 * @property {string} id Tuit id
 * @property {string} tuit Tuit content
 * @property {Date} postedOn Posted date
 * @property {User} postedBy Posted user
 */
export default class Tuit {
    private id: string;
    private tuit: string;
    private postedOn: Date;
    private postedBy: User | null;

    constructor(id: string, tuit: string, postedOn: Date, postedBy: any) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = postedBy;
    }
}