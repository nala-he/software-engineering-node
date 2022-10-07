import User from "./User"

export default class Tuit {
    private id: string;
    private tuit: string;
    private postedOn: Date;
    private postedBy: User | null;

    constructor(id: string, tuit: string, postedOn: Date, postedBy: any) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = postedBy;
    }

    set newTuitAuthor(user: User) { this.postedBy = user; }
    get tuitAuthor(): User | null { return this.postedBy; }
    get tuitContent(): string { return this.tuit; }
}