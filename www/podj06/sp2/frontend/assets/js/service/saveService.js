const STORAGE_KEY = "savedStops";
export class SaveService {
    constructor() {
        this.initLocalStorage();
    }
    getSavedStops() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    removeOrAddStop(cisId, name) {
        cisId = parseInt(cisId);
        let filtered = this.getSavedStops().filter((stop) => {
            return stop.cisId === cisId;
        });

        if (filtered.length > 0) {
            console.log("Removing stop");
            this.removeStop(cisId);
        } else {
            console.log("Saving stop");
            this.saveStop(cisId, name);
        }
    }

    saveStop(cisId, name) {
        cisId = parseInt(cisId);
        let stops = this.getSavedStops();
        stops.push({
           "cisId": cisId,
           "name": name
        });
        this.setLocalStorage(stops);
    }

    removeStop(cisId) {
        cisId = parseInt(cisId);
        let stops = this.getSavedStops().filter((item) => {
            return item.cisId !== cisId;
        });
        this.setLocalStorage(stops);
    }

    setLocalStorage(stops) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stops));
    }

    initLocalStorage() {
        if (!localStorage.getItem(STORAGE_KEY)) {
            this.setLocalStorage([]);
        }
    }
}