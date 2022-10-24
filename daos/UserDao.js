var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao {
    constructor() { }
    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModels = yield UserModel.find();
            const userModels = userMongooseModels
                .map((userMongooseModels) => {
                var _a, _b, _c, _d, _e, _f;
                return new User((_a = userMongooseModels === null || userMongooseModels === void 0 ? void 0 : userMongooseModels._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModels === null || userMongooseModels === void 0 ? void 0 : userMongooseModels.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModels === null || userMongooseModels === void 0 ? void 0 : userMongooseModels.password) !== null && _c !== void 0 ? _c : '', (_d = userMongooseModels === null || userMongooseModels === void 0 ? void 0 : userMongooseModels.firstName) !== null && _d !== void 0 ? _d : '', (_e = userMongooseModels === null || userMongooseModels === void 0 ? void 0 : userMongooseModels.lastName) !== null && _e !== void 0 ? _e : '', (_f = userMongooseModels.email) !== null && _f !== void 0 ? _f : '');
            });
            return userModels;
        });
    }
    /**
     * Uses UserModel to retrieve single user document from users collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when user is retrieved from the database
     */
    findUserById(uid) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel.findById(uid);
            return new User((_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.password) !== null && _c !== void 0 ? _c : '', (_d = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.firstName) !== null && _d !== void 0 ? _d : '', (_e = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.lastName) !== null && _e !== void 0 ? _e : '', (_f = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.email) !== null && _f !== void 0 ? _f : '');
        });
    }
    /**
     * Inserts user instance into the database
     * @param {User} user Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
    createUser(user) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const userMongooseModel = yield UserModel.create(user);
            return new User((_a = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.username) !== null && _b !== void 0 ? _b : '', (_c = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.password) !== null && _c !== void 0 ? _c : '', (_d = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.firstName) !== null && _d !== void 0 ? _d : '', (_e = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.lastName) !== null && _e !== void 0 ? _e : '', (_f = userMongooseModel === null || userMongooseModel === void 0 ? void 0 : userMongooseModel.email) !== null && _f !== void 0 ? _f : '');
        });
    }
    /**
     * Updates user with new values in database
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns Promise To be notified when user is updated in the database
     */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel.updateOne({ _id: uid }, { $set: {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                } });
        });
    }
    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns Promise To be notified when user is removed from the database
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel.deleteOne({ _id: uid });
        });
    }
}
UserDao.userDao = null;
/**
 * Creates singleton DAO instance
 * @returns UserDao
 */
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
