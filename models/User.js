/**
 * @file Declares User data type
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
/**
 * @typedef {User} User Represents a tuit user
 * @property {string} id User id
 * @property {string} username User name
 * @property {string} firstName User firstname
 * @property {string} lastName User lastname
 * @property {string} email User email
 * @property {string} profilePhoto Profile photo
 * @property {string} headerImage Header image
 * @property {AccountType} accountType Account type
 * @property {MaritalStatus} maritalStatus Marital status
 * @property {string} biography Bio
 * @property {string} dateOfBirth DOB
 * @property {Date} joined Joined date
 * @property {Location} location Location
 */
export default class User {
    constructor(id, username, password, firstName, lastName, email) {
        this.username = '';
        this.password = '';
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType.Personal;
        this.maritalStatus = MaritalStatus.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
