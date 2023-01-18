// Making a map and tiles
const mymap = L.map('issMap').setView([0, 0], 1);
mymap.setMaxBounds(mymap.getBounds());

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(
    tileUrl, 
    {   
        noWrap: true,
        maxZoom: 10,
        minZoom: 1,
    },     //stops dublicating the map and sets min/max zoom
    {attribution}
);

tiles.addTo(mymap);

// Making a marker with a custom icon 
const issIcon = L.icon({
    iconUrl: 'img/asd.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

// Requesting for API
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

async function getISS(){
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude, longitude} = data;

    marker.setLatLng([latitude, longitude]);

    if(firstTime){
        mymap.setView([latitude, longitude],3);
        firstTime = false;
    }
    document.getElementById('lat').textContent=latitude.toFixed(2);
    document.getElementById('lon').textContent=longitude.toFixed(2);
}

// Refreshing the marker's location
setInterval(getISS, 1000);