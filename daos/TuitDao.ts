/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .populate("postedBy", "username")
            .exec();

    /**
     * Uses TuitModel to retrieve tuit documents from tuits collection based on a
     * given user id
     * @returns Promise To be notified when the tuits are retrieved from database
     */
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid})
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to retrieve a tuit document from tuits collection based on a
     * given tuit id
     * @returns Promise To be notified when the tuit is retrieved from database
     */
    findTuitById = async (tid: string): Promise<Tuit> =>
        TuitModel.findById(tid)
            .exec();

    /**
     * Inserts tuit instance into the database
     * @param {string} uid Id of user who creates the tuit
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {any} tuit Tuit content
     * @returns Promise To be notified when tuit is updated in the database
     */
    public async updateTuit(tid: string, tuit: any): Promise<any> {
        return TuitModel.updateOne({_id: tid},
            {$set: {
                tuit: tuit.tuit,
                postedBy: tuit.postedBy
            }});
    }

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    public async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }
}