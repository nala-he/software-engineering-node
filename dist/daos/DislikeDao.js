"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @implements {DislikeDaoI}
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
class DislikeDao {
    constructor() { }
}
exports.default = DislikeDao;
DislikeDao.dislikeDao = null;
/**
 * Creates singleton DAO instance
 * @returns DisikeDao
 */
DislikeDao.getInstance = () => {
    if (DislikeDao.dislikeDao === null) {
        DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
};
//# sourceMappingURL=DislikeDao.js.map