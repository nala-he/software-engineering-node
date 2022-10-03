import Tuit from "./Tuit";
import Tag from "./Tag";

export default class Tuit2Tag {
    private tag: string = new Tag().tagContent;
    private tuit: Tuit | null = null;
}