import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import e from "express";

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

    // get uName() { return this.username; }
    // get fName() { return this.firstName; }
    // get pass() { return this.password; }
    //
    // set uName(username: string) { this.username = username; }
    // set pass(password: string) { this.password = password; }
}