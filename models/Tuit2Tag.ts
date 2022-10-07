import Tuit from "./Tuit";
import Tag from "./Tag";

export default class Tuit2Tag {
    private tag: string;
    private tuit: Tuit | null;

    constructor(tag: Tag, tuit: Tuit) {
        this.tag = tag.tagContent;
        this.tuit = tuit;
    }
}