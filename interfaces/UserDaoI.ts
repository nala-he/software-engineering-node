import User from "../models/User";
import {promises} from "dns";

export default interface UserDaoI {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<any>;
    createUser(user: User): Promise<User>;
    updateUser(uid: string, user: User): Promise<any>;
    deleteUser(uid: string): Promise<any>;
}