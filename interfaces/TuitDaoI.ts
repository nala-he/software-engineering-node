import Tuit from "../models/Tuit";
/**
 * @file Declares API for Tuits related data access object methods
 * @interface
 */
export default interface TuitDaoI {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit>;
    createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
}
