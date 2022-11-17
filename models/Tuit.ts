/**
 * @file Declares Tuit data type
 */
import User from "./User"
import Stats from "./Stats"

/**
 * @typedef {Tuit} Tuit Represents a tuit
 * @property {string} id Tuit id
 * @property {string} tuit Tuit content
 * @property {Date} postedOn Posted date
 * @property {User} postedBy Posted user
 * @property {Stats} stats Tuit statistics
 */
export default interface Tuit {
    id: string;
    tuit: string;
    postedOn: Date;
    postedBy: User | null;
    stats: Stats;
}

// export default class Tuit {
//     private id: string;
//     private tuit: string;
//     private postedOn: Date;
//     private postedBy: User | null;
//     public stats: {
//         replies: Number | 0;
//         retuits: Number | 0;
//         likes: Number | 0;
//     }
//
//     constructor(id: string, tuit: string, postedOn: Date, postedBy: any, stats: any) {
//         this.id = id;
//         this.tuit = tuit;
//         this.postedOn = postedOn;
//         this.postedBy = postedBy;
//         this.stats = stats;
//     }

    // public setLikes(likes: Number) {
    //     this.stats.likes = likes;
    // }
    //
    // public getStats() {
    //     return this.stats;
    // }
// }