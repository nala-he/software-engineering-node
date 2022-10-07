export default class Location {
    private latitude: number = 0.0;
    private longitude: number = 0.0;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    get latiNum() { return this.latitude; }
    get longiNum() { return this.longitude; }
    set latiNum(latitude: number) { this.latitude = latitude; }
    set longiNum(longitude: number) { this.longitude = longitude; }
};
