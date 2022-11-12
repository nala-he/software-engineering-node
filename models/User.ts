/**
 * @file Declares User data type
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

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
    private id: string;
    private username: string = '';
    private password: string = '';
    private firstName: string | null;
    private lastName: string | null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;

    constructor(id: string, username: string, password: string, firstName: string | null,
                lastName: string | null, email: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public setPassword(password: string) {
        this.password = password;
    }
}