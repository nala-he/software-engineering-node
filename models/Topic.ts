export default class Topic {
    private topic: string;

    constructor(topic: string) {
        this.topic = topic;
    }

    get topicContent() {
        return this.topic;
    }
}