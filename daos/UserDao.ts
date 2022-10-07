import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    public static getInstance = (): UserDao => {
        if (UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor() {}

    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        const userModels = userMongooseModels
            .map((userMongooseModels) => {
                return new User(
                    userMongooseModels?._id.toString() ?? '',
                    userMongooseModels?.username ?? '',
                    userMongooseModels?.password ?? '',
                    userMongooseModels?.firstName ?? '',
                    userMongooseModels?.lastName ?? '',
                    userMongooseModels.email ?? ''
                );
            });
        return userModels;
    }

    async findUserById(uid: string): Promise<any> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString() ?? '',
            userMongooseModel?.username ?? '',
            userMongooseModel?.password ?? '',
            userMongooseModel?.firstName ?? '',
            userMongooseModel?.lastName ?? '',
            userMongooseModel?.email ?? ''
        );
    }

    async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel?._id.toString() ?? '',
            userMongooseModel?.username ?? '',
            userMongooseModel?.password ?? '',
            userMongooseModel?.firstName ?? '',
            userMongooseModel?.lastName ?? '',
            userMongooseModel?.email ?? ''
        );
    }

    async updateUser(uid: string, user: any): Promise<any> {
        return UserModel.updateOne({_id: uid},
            {$set: {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }});
    }

    async deleteUser(uid: string):  Promise<any> {
        return UserModel.deleteOne({_id: uid});
    }
}