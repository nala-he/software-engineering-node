export default class Location {
    constructor(latitude, longitude) {
        this.latitude = 0.0;
        this.longitude = 0.0;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    get latiNum() { return this.latitude; }
    get longiNum() { return this.longitude; }
    set latiNum(latitude) { this.latitude = latitude; }
    set longiNum(longitude) { this.longitude = longitude; }
}
;