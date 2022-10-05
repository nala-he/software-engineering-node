import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";
import User from "../models/User";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    public async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel.find().populate("postedBy", "username");
        const tuitModels = tuitMongooseModels
            .map((tuitMongooseModels) => {
                return new Tuit(
                    tuitMongooseModels?._id.toString() ?? '',
                    tuitMongooseModels?.tuit ?? '',
                    new Date(tuitMongooseModels?.postedOn ?? (new Date())),
                    tuitMongooseModels?.postedBy
                );
            });
        return tuitModels;
    }

    public async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel.find({postedBy: uid})
            .populate("postedBy", "username");
        const tuitModels = tuitMongooseModels
            .map((tuitMongooseModels) => {
                return new Tuit(
                    tuitMongooseModels?._id.toString() ?? '',
                    tuitMongooseModels?.tuit ?? '',
                    new Date(tuitMongooseModels?.postedOn ?? (new Date())),
                    tuitMongooseModels?.postedBy
                );
            });
        return tuitModels;
    }

    public async findTuitById(tid: string): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.findById(tid).populate("postedBy", "username").exec();
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
            tuitMongooseModel?.postedBy
        );
    }

    public async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
            tuitMongooseModel?.postedBy
        );
    }

    public async updateTuit(tid: string, tuit: any): Promise<any> {
        return TuitModel.updateOne({_id: tid},
            {$set: {
                tuit: tuit.tuit,
                postedBy: tuit.postedBy
            }});
    }

    public async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }
}