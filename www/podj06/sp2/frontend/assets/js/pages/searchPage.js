import {HTTPService} from "/assets/js/service/httpservice.js";
import {SaveService} from "/assets/js/service/saveService.js";

const TYPING_INTERVAL = 500;
const STAR_EMPTY = "bi-star";
const STAR_FILLED = "bi-star-fill";

const STOP_ELEMENT = `
<div role="button" class="card mb-2 stop" data-stop-name="#name#" data-stop-cisId="#cisId#">
        <div class="card-body row">
            <div class="col-9">
                <p class="h3 mb-0">#name#</p>
            </div>
            <div class="col-2">
                <p class="h3 mb-0">#distance#</p>
            </div>
            <div class="col-1">
                <i role="button" class="saveStop bi #saved#" style="font-size: 1.5rem"></i>
            </div>
        </div>
    </div>
`
export class SearchPage {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.httpService = new HTTPService();
        this.saveService = new SaveService();
        this.typingTimer = null;
        this.stopNameBox = document.querySelector("#stopName");
        this.stopsList = document.querySelector("#stopsList");
        this.savedStopsList = document.querySelector("#savedStopsList");
        this.setSearchListeners();
        this.renderSavedStops();
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

    setStopElementListeners() {
        document.querySelectorAll(".stop").forEach((stopElement) => {

            let stopCisId = stopElement.getAttribute("data-stop-cisId");
            let stopName = stopElement.getAttribute("data-stop-name");

            stopElement.onclick = () => {
                this.app.redirect("/stop?cisId=" + stopCisId);
            }

            stopElement.querySelector(".saveStop").onclick = (onClickEvent) => {
                onClickEvent.stopPropagation();
                this.saveService.removeOrAddStop(stopCisId, stopName);

                let starElement = onClickEvent.target;
                starElement.classList.remove(STAR_FILLED, STAR_EMPTY);
                starElement.classList.add(this.isSaved(stopCisId));
            }
        });
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

    createStop(name, distance, cisId) {
        return STOP_ELEMENT
            .replaceAll("#name#", name)
            .replaceAll("#distance#", distance == null ? "" : (Math.floor(distance * 1000) + " m"))
            .replaceAll("#cisId#", cisId)
            .replaceAll("#saved#", this.isSaved(cisId));
    }

    searchStopsByGeolocation(coords) {
        this.httpService.searchByLocation(coords.latitude, coords.longitude)
            .then((response) => {
                this.resetList();
                let stopListHtml = "";
                response.forEach((stop) => {
                    stopListHtml += this.createStop(stop.name, stop.distance, stop.cisId);
                })
                this.stopsList.innerHTML = stopListHtml;
                this.setStopElementListeners();
            });
    }

    searchStopsByName() {
        let value = this.stopNameBox.value;
        this.httpService.searchByName(value)
            .then((response) => {
                this.resetList();
                let stopListHtml = "";
                response.forEach((stop) => {
                    stopListHtml += this.createStop(stop.name, null, stop.cisId);
                })
                this.stopsList.innerHTML = stopListHtml;
                this.setStopElementListeners();
            })
    }

    resetList() {
        this.stopsList.innerHTML = "";
    }

    renderSavedStops() {
        let savedStopsHtml = "";
        this.saveService.getSavedStops().forEach((stop) => {
           savedStopsHtml += this.createStop(stop.name, null, stop.cisId);
        });
        this.savedStopsList.innerHTML = savedStopsHtml;
        this.setStopElementListeners();
    }

    isSaved(cisId) {
        cisId = parseInt(cisId);
        return this.saveService
            .getSavedStops()
            .filter((stop) => {
                return stop.cisId === cisId;
            }).length > 0 ? STAR_FILLED : STAR_EMPTY;
    }
}