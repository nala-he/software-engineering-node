/**
 * @file Declares Location data type
 * @typedef {Location} Location Represents a location
 * @property {number} latitude Latitude
 * @property {number} longitude Longitude
 */
export default class Location {
    private latitude: number = 0.0;
    private longitude: number = 0.0;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
};
