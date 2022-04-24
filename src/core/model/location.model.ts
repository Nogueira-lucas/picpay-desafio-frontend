export class LocationModel{
    country: string;
    state: string;
    city: string;
    latitude: string;
    longitude: string;
    ip: string;

    constructor(
        country: string,
        state: string,
        city: string,
        latitude: string,
        longitude: string,
        ip: string
    ){
        this.country = country;
        this.state = state;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ip = ip;
    }
}