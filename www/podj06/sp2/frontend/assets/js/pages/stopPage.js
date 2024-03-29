import {HTTPService} from "../service/httpservice.js";
import {Query} from "../util/query.js";

const TYPE_MAP = {
    0: "bi-train-lightrail-front",
    1: "bi-train-front-fill",
    2: "bi-train-front",
    3: "bi-truck-front"
}
const CIS_ID_NAME = "cisId";
const LIST_ITEM = `
<div class="card mb-2" data-scheduled-departure="#scheduled#" data-delay="#delay#" data-line="#line#" data-direction="#direction#" data-trip-id="#tripId#">
    <div class="card-body row">
        <div class="col">
            <p class="h3">#line#</p>
            <p class="mb-0">Nástupiště #platform#</p>
        </div>
        <div class="col">
            <p class="mb-3 fw-bolder">#direction#</p>
            <p class="mb-0 scheduledDeparture">00:00</p>
        </div>
        <div class="col">
            <p class="h3 remainingTime">00:00</p>
        </div>
        <div class="col">
           <i class="bi #type#" style="font-size: 2.5rem"></i>
        </div>
    </div>
</div>
`
export class StopPage {
    constructor() {
        this.httpService = new HTTPService()
        this.departureList = document.querySelector("#departuresList");
        this.stopNameEl = document.querySelector("#stopName");
        this.allowedTypes = [0, 1, 2, 3]; // Tram, Metro, Train, Bus
    }

    init() {
        this.setCisId();
        this.render();
        this.setUpdateTasks();
        this.setEventListeners();
        this.departureListElements = document.querySelectorAll("#departuresList > div");
    }

    setCisId() {
        let cisId = new Query().getQuery(CIS_ID_NAME);

        if (cisId === null || isNaN(cisId)) {
            alert("Chybná hodnota cisId!");
            window.location = "/";
        }

        this.cisId = cisId;
    }

    render() {
        this.departureList.innerHTML = "";
        this.httpService.getDepartureBoard(this.cisId)
            .then((data) => {
                this.stopNameEl.textContent = data.stops[0].stopName;
                let appendHtml = "";
                data.departures.forEach((value) => {

                    if (!this.allowedTypes.includes(value.route.type)) {
                        return;
                    }

                     appendHtml += (
                        LIST_ITEM
                            .replaceAll("#scheduled#", value.departureTimestamp.scheduled)
                            .replaceAll("#tripId#", value.trip.id)
                            .replaceAll("#delay#", value.delay.seconds)
                            .replaceAll("#line#", value.route.shortName)
                            .replaceAll("#direction#", value.trip.headsign)
                            .replaceAll("#platform#", value.stop.platformCode)
                            .replaceAll("#type#", TYPE_MAP[value.route.type])
                    );
                });
                this.departureList.innerHTML = appendHtml;
                this.departureListElements = document.querySelectorAll("#departuresList > div");
                this.updateRemainingTime();
            })
    }

    setUpdateTasks() {
        this.setUpdateEverySecond();
    }

    setUpdateEverySecond() {
        setInterval(() => {
            this.updateRemainingTime();
        }, 1000);
    }

    updateRemainingTime() {
        let now = moment();
        this.departureListElements
            .forEach((el) => {
                let scheduledDeparture = moment.parseZone(el.getAttribute("data-scheduled-departure"));
                let delay = parseInt(el.getAttribute("data-delay"));
                let isDelayAvailable = true;
                if (isNaN(delay)) {
                    delay = 0;
                    isDelayAvailable = false
                }
                el.querySelector(".scheduledDeparture").textContent = scheduledDeparture.format("HH:mm") + " (" + (delay >= 0 ? "+ " : "") + (isDelayAvailable ? this.convertSeconds(delay) : "??") + ")";
                let predictedDeparture = moment(scheduledDeparture).add(delay, 's');
                let diffDuration = moment.duration(predictedDeparture.diff(now));
                el.querySelector(".remainingTime").textContent = this.convertSeconds(diffDuration.asSeconds())
            })
    }

    setEventListeners() {
        document.querySelectorAll("#typeSelector button").forEach((val) => {
           val.onclick = (event) => {
               let target = event.target;
               let typeId = parseInt(target.getAttribute("data-type-id"));
               let index = this.allowedTypes.indexOf(typeId);
               if (index === -1) {
                   this.allowedTypes.push(typeId);
                   target.classList.add("btn-success");
                   target.classList.remove("btn-outline-success");
               } else {
                   this.allowedTypes.splice(index, 1);
                   target.classList.add("btn-outline-success");
                   target.classList.remove("btn-success");
               }
               this.render();
           }
        });
    }

    convertSeconds(seconds) {
        seconds = parseInt(seconds);
        let secondsAbsolute = Math.abs(seconds);
        let minutes = Math.floor(secondsAbsolute / 60);
        let remainingSeconds = secondsAbsolute % 60;

        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }

        return (seconds < 0 ? "- " : "") +  minutes + ":" + remainingSeconds;
    }

}