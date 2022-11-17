/**
 * @typedef {Stats} Stats Represents a stats
 * @property {number} replies number of replies
 * @property {number} retuits number of retuits
 * @property {number} likes number of likes
 */
export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number,
    dislikes: number
};