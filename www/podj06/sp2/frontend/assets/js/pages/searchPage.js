import {HTTPService} from "/assets/js/service/httpservice.js";

const TYPING_INTERVAL = 750;

const STOP_ELEMENT = `<a class="text-decoration-none" href="/stop?cisId=#cisId#"><div class="card mb-2">
<div class="card-body row">
    <div class="col-10">
        <p class="h3 mb-0">#name#</p>
    </div>
    <div class="col-2">
        <p class="h3 mb-0">#distance#</p>
    </div>
</div>
</div></a>
`
export class SearchPage {
    init() {
        this.httpService = new HTTPService();
        this.typingTimer = null;
        this.stopNameBox = document.querySelector("#stopName");
        this.stopsList = document.querySelector("#stopsList");
        this.setSearchListeners();
    }

    setSearchListeners() {
        document.querySelector("#geolocationButton").onclick = () => {
            this.geolocationRequested();
        }
        this.stopNameBox.onkeyup = () => {
            clearTimeout(this.typingTimer);
            if (this.stopNameBox.value.length >= 3) {
                this.typingTimer = setTimeout(() => this.searchStopsByName(), TYPING_INTERVAL);
            }
        }
    }

    geolocationRequested() {
        console.log("Requesting geolocation");
        this.getLocation()
            .then((res) => {
                if (res) {
                    this.searchStopsByGeolocation(res.coords);
                }
            })
            .catch(() => {
                alert("Nepodařilo se získat souřadnice");
            })
    }

    getLocation() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            );
        });
    }

    appendStop(name, distance, cisId) {
        this.stopsList.innerHTML += (
            STOP_ELEMENT
                .replaceAll("#name#", name)
                .replaceAll("#distance#", distance == null ? "" : (Math.floor(distance * 1000) + " m"))
                .replaceAll("#cisId#", cisId)
        )
    }

    searchStopsByGeolocation(coords) {
        this.httpService.searchByLocation(coords.latitude, coords.longitude)
            .then((response) => {
                this.resetList();
                response.forEach((stop) => {
                    this.appendStop(stop.name, stop.distance, stop.cisId);
                })
            });
    }

    searchStopsByName() {
        let value = this.stopNameBox.value;
        this.httpService.searchByName(value)
            .then((response) => {
                this.resetList();
                response.forEach((stop) => {
                    this.appendStop(stop.name, null, stop.cisId);
                })
            })
    }

    resetList() {
        this.stopsList.innerHTML = "";
    }
}