import {API_BASE} from "../constants.js";

export class HTTPService {
    async searchByLocation(lat, lon) {
        const response = await fetch(API_BASE + "/api/v1/stops/search/by-location/" + lat + "/" + lon, {method: "POST"});

        return response.json();
    }

    async searchByName(name) {
        const response = await fetch(API_BASE + "/api/v1/stops/search/by-name/" + name, {method: "POST"});

        return response.json();
    }

    async getDepartureBoard(cisId) {
        const response = await fetch(API_BASE + "/api/v1/stops/departure-board/" + cisId, {method: "POST"});

        return response.json();
    }
}