import Tuit from "./Tuit";
import Topic from "./Topic";

export default class Tuit2Topic {
    private topic: string;
    private tuit: Tuit | null;

    constructor(topic: Topic, tuit: Tuit) {
        this.topic = topic.topicContent;
        this.tuit = tuit;
    }
}