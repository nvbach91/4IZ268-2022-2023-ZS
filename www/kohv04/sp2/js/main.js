$(document).ready(() => {
    // Libraries and APIs: Openlayers, Jquery, Geolocation, Mapbox, fullscreen, geocoding REST API, Canvas.
    
    // Setting favicon 
    function setFavicon(favImg) {
        $('head').append('<link rel="shortcut icon" href="' + favImg + '">');
    }
    setFavicon('https://img.icons8.com/color/512/earth-planet.png');
    
    
    // Making the map and setting the view
    const mapView = new ol.View ({
        center: ol.proj.fromLonLat([15,50]),
        zoom: 5,
    });
    
    const map = new ol.Map({
        target: 'map',
        view: mapView,
        controls: []
    });
    
    //Making the layers
    const noneTile = new ol.layer.Tile({
        title: 'None',
        type: 'base',
        visible: false
    })
    
    const osmSource = new ol.source.OSM();
    
    const osmTile = new ol.layer.Tile ({
        title: 'Open Street Map',
        visible: true,
        type: 'base',
        source: osmSource
    });
    
    const baseGroup = new ol.layer.Group({
        title: 'Maps',
        fold: true, 
        layers: [osmTile, noneTile],
    });
    
    map.addLayer(baseGroup);
    
    // Loading my layers
    // Loading as a GeoJSON
    const EuUrbanAreas = new ol.layer.Vector({
        title: "EU URBAN AREAS",
        visible: true,
        source: new ol.source.Vector({
          url: './source/files/EU_URBAN_AREAS_2021_4326.json',
          format: new ol.format.GeoJSON(),
          tiled: true,
          projection: 'EPSG:4326'
        }),
        style: new ol.style.Style({
            image: new ol.style.RegularShape({
              points: 4,
              radius: 2,
              fill: new ol.style.Fill({
                color: '#FF0000'
              })
            })
        })
    });
    
    const CzechiaWater = new ol.layer.Vector({
        title: "CZECHIA WATERWAYS",
        visible: true,
        source: new ol.source.Vector({
            url: './source/files/WATER_CZECHIA_4326.json',
            format: new ol.format.GeoJSON(),
            tiled: true,
             projection: 'EPSG:4326'
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0000FF',
                width: 0.1
            }),
            fill: new ol.style.Fill({
                color: '#ADD8E6'
            })
        })
    });
    
    const EuNutsTile = new ol.layer.Vector({
        title: "EU NUTS",
        visible: true,
        source: new ol.source.Vector({
            url: './source/files/NUTS_RG_20M_2021_4326.geojson',
            format: new ol.format.GeoJSON(),
            tiled: true,
            projection: 'EPSG:4326'
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#000000',
                width: 0.3
            }),
            fill: new ol.style.Fill({
                color: 'transparent'
            })
        })
    });
    
    // Getting and making a layer. This loading process uses AJAX, even though we do not have AJAX directly in the code.
    
    const BritishMuseumUrl = 'https://nominatim.openstreetmap.org/search.php?q=British+Museum&format=geojson&limit=1';
    const TheTowerUrl = 'https://nominatim.openstreetmap.org/search.php?q=Tower+of+London&format=geojson&limit=1';
    const BigBenUrl = 'https://nominatim.openstreetmap.org/search.php?q=Big+Ben&format=geojson&limit=1';
    const BuckinghamPalaceUrl = 'https://nominatim.openstreetmap.org/search.php?q=Buckingham+Palace&format=geojson&limit=1';
    const WestminsterAbbeyUrl = 'https://nominatim.openstreetmap.org/search.php?q=Westminster+Abbey&format=geojson&limit=1';
    
    
    const BritishMuseum = new ol.layer.Vector({
        title: "British Museum",
        visible: true,
        source: new ol.source.Vector({
            url: BritishMuseumUrl,
            format: new ol.format.GeoJSON(),
            tiled: true,
            projection: 'EPSG:4326'
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'https://img.icons8.com/cotton/2x/museum.png',
                scale: 0.1
            })
        })
    });
    
    const TheTower = new ol.layer.Vector({
        title: "The Tower",
        visible: true,
        source: new ol.source.Vector({
            url: TheTowerUrl,
            format: new ol.format.GeoJSON(),
            tiled: true,
            projection: 'EPSG:4326'
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#006400'
                }),
                stroke: new ol.style.Stroke({
                    color: '#006400'
                }),
                radius: 5
            })
        })
    });
    
    const BigBen = new ol.layer.Vector({
        title: "Big Ben",
        visible: true,
        source: new ol.source.Vector({
            url: BigBenUrl,
            format: new ol.format.GeoJSON(),
            tiled: true,
            projection: 'EPSG:4326'
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#FF0000'
                }),
                stroke: new ol.style.Stroke({
                    color: '#FF0000'
                }),
                radius: 5
            })
        })
    });
    
    const BuckinghamPalace = new ol.layer.Vector({
        title: "Buckingham Palace",
        visible: true,
        source: new ol.source.Vector({
            url: BuckinghamPalaceUrl,
            format: new ol.format.GeoJSON(),
            tiled: true,
            projection: 'EPSG:4326'
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#0000FF'
                }),
                stroke: new ol.style.Stroke({
                    color: '#0000FF'
                }),
                radius: 5
            })
        })
    });
    
    const WestminsterAbbey = new ol.layer.Vector({
        title: "Westminster Abbey",
        visible: true,
        source: new ol.source.Vector({
            url: WestminsterAbbeyUrl,
            format: new ol.format.GeoJSON(),
            tiled: true,
            projection: 'EPSG:4326'
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#FFFF00'
                }),
                stroke: new ol.style.Stroke({
                    color: '#FFFF00'
                }),
                radius: 5
            })
        })
    });
    
    
    // Making a group for overlays
    const overlayGroup = new ol.layer.Group({
        title: 'Overlay',
        fold: true,
        layers: [EuNutsTile, EuUrbanAreas, CzechiaWater],
    });
    
    map.addLayer(overlayGroup);
    
    const placesGroup = new ol.layer.Group({
        title: 'Places',
        fold: true,
        layers: [BritishMuseum, TheTower, BigBen, BuckinghamPalace, WestminsterAbbey]
    });
    
    
    map.addLayer(placesGroup);
    
    // Making Layer Switcher
    const layerSwitcher = new ol.control.LayerSwitcher({
        activationMode: 'click',
        startActive: false,
        groupSelectStyle: 'children'
    });
    
    map.addControl(layerSwitcher);
    
    // Making the layers invisible so the application starts faster
    CzechiaWater.setVisible(false);
    EuNutsTile.setVisible(false);
    EuUrbanAreas.setVisible(false);
    
    TheTower.setVisible(false);
    BigBen.setVisible(false);
    BuckinghamPalace.setVisible(false);
    WestminsterAbbey.setVisible(false);
    
    
    /// Adding latitude and longitude to the mouse position
    const mousePosition = new ol.control.MousePosition({
        className: 'mousePosition',
        projection: 'EPSG:4326',
        coordinateFormat: function (coordinate) { return ol.coordinate.format(coordinate, '{y} , {x}', 6); }
    });
    map.addControl(mousePosition);
    
    // Adding a scale line
    const scaleLine = new ol.control.ScaleLine({
        bar: true,
        text: true,
    });
    map.addControl(scaleLine);
    
    // Custom features
    
    // Adding fullscreen feature
    const fullscreenButton = $('<button>').html('<img src="./source/images/expand.svg" alt="" class= "FeatureImg"></img>').addClass('myButton');
    const fullscreenElement = $('<div>').addClass('FullscreenButtonDiv').append(fullscreenButton);
    const fullscreenControl = new ol.control.Control({
        element: fullscreenElement[0]
    });
    
    $(fullscreenButton).on("click", () => {
        const mapEl = $("#map")[0];
        if (mapEl.requestFullscreen) {
            mapEl.requestFullscreen();
        } else if (mapEl.msRequestFullscreen) {
            mapEl.msRequestFullscreen();
        } else if (mapEl.mozRequestFullscreen) {
            mapEl.mozRequestFullscreen();
        } else if (mapEl.webkitRequestFullscreen) {
            mapEl.webkitRequestFullscreen();
        }
    });
    
    map.addControl(fullscreenControl);
    
    
    // Home feature
    const $homeButton = $('<button>')
        .html('<img src="./source/images/house.svg" alt="" class= "FeatureImg"></img>')
        .addClass('myButton');
    
    const $homeElement = $('<div>')
        .addClass('HomeButtonDiv')
        .append($homeButton);
    
    const homeControl = new ol.control.Control({
        element: $homeElement[0]
    });
    
    $homeButton.on("click", () => {
        map.getView().setCenter(ol.proj.fromLonLat([15,50]));
        map.getView().setZoom(5);
    });
    
    map.addControl(homeControl);
    
    // Info feature --- Scrapped
    const $infoButton = $('<button>')
        .html('<img src="./source/images/info.svg" alt="" class= "FeatureImg"></img>')
        .addClass('myButton')
        .attr('id', 'InfoButton');
    
    const $infoElement = $('<div>')
        .addClass('InfoDiv')
        .append($infoButton);
    
    const infoControl = new ol.control.Control({
        element: $infoElement[0]
    });
    
    let infoFlag = false;
    $infoButton.on("click", () => {
        $infoButton.toggleClass('clicked');
        infoFlag = !infoFlag;
    });
    
    map.addControl(infoControl);
    
    // Continuing the popup with enabled information feature --- Scrapped
    
    // Popup --- Scrapped
    map.on('singleclick', function(evt) {
        if (infoFlag) {
            $content.html('');
            const resolution = mapView.getResolution();
    
            const url = osmSource.getFeaturesAtCoordinate(evt.coordinate, resolution, 'EPSG:3857', {
                'INFO_FORMAT': 'application/json',
                'propertyName': 'addr:city, addr:country, ele'
            });
            if (url) {
                $.getJSON(url, function(data) {
                    const feature = data.features[0];
                    const props = feature.properties;
                    $content.html("<h3> City: </h3> <p>" + props['addr:city'] + "</p>" +
                        "<h3> Country: </h3> <p>" + props['addr:country'] + "</p>" +
                        "<h3> Elevation: </h3> <p>" + props.ele + "</p>");
    
                    $popup.setPosition(evt.coordinate);
                });
            } else {
                $popup.setPosition(undefined);
            }
        }
    });
    
    // Geolocation 
    // With relation to the element
    
    $("#Crosshair").on("click", function (evet) {
        $("#Crosshair").toggleClass("clicked");
        if ($("#Crosshair").hasClass("clicked")) {
            startLocate();
        } else {
            stopLocate();
        }
    });
    
    // Locating features
    
    // Making global variables
    let intervalLocate;
    let posCurrent;
    
    const geolocation = new ol.Geolocation({
        trackingOptions: {
            enableHighAccuracy: true,
        },
        tracking: true,
        projection: mapView.getProjection()
    });
    
    const positionFeature = new ol.Feature();
    positionFeature.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({
                    color: '#BCD4E6'
                }),
                stroke: new ol.style.Stroke({
                    color: '#00008B',
                    width: 2,
                })
            })
        })
    );
    const accuracyFeature = new ol.Feature();
    
    const currentPositionLayer = new ol.layer.Vector({
        map: map,
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature],
        }),
    });
    
    // The locating functions themselves
    
    function startLocate() {
        let coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        mapView.setCenter(coordinates);
        mapView.setZoom(15);
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        intervalLocate = setInterval(function () {
            let coordinates = geolocation.getPosition();
            const accuracy = geolocation.getAccuracyGeometry()
            positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
            accuracyFeature.setGeometry(accuracy);
        }, 30);
    };
    
    function stopLocate() {
        clearInterval(intervalLocate);
        positionFeature.setGeometry(null);
        accuracyFeature.setGeometry(null);
    };
    
    // Measuring Features
    // I actually scrapped the 'Help' tooltips, so
    // there is more code than needed.
    
    // Measure distance
    const distanceButton = $('<button>')
    .html('<img src="./source/images/ruler-vertical.svg" alt="" class= "FeatureImg"></img>')
    .addClass('myButton')
    .attr('id', 'distanceButton');
    
    const distanceElement = $('<div>')
    .addClass('distanceButtonDiv')
    .append(distanceButton);
    
    const distanceControl = new ol.control.Control({
    element: distanceElement[0]
    });
    
    let distanceFlag = false;
    distanceButton.on("click", () =>{
    distanceButton.toggleClass('clicked');
    distanceFlag = !distanceFlag;
    $("#map").css("cursor", "default");
    if(distanceFlag){
    map.removeInteraction(draw);
    addInteraction('LineString');
    } else {
    map.removeInteraction(draw);
    source.clear();
    $('.ol-tooltip.ol-tooltip-static').remove();
    }
    });
    
    map.addControl(distanceControl);
    
    // Measure zone
    
    const zoneButton = $('<button>')
        .html('<img src="./source/images/ruler-combined.svg" alt="" class= "FeatureImg"></img>')
        .addClass('myButton')
        .attr('id', 'zoneButton');
    
    const zoneElement = $('<div>')
        .addClass('zoneButtonDiv')
        .append(zoneButton);
    
    const zoneControl = new ol.control.Control({
        element: zoneElement[0]
    });
    
    let zoneFlag = false;
    $(zoneButton).on("click", function() {
        $(this).toggleClass('clicked');
        zoneFlag = !zoneFlag;
        $("#map").css("cursor", "default");
        if(zoneFlag){
            map.removeInteraction(draw);
            addInteraction('Polygon');
        } else {
            map.removeInteraction(draw);
            source.clear();
            $(".ol-tooltip.ol-tooltip-static").remove();
        }
    });
    
    map.addControl(zoneControl);
    
    let draw;
    
    const source = new ol.source.Vector();
    const vector = new ol.layer.Vector({
        source:source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.3)',
            }),
            stroke: new ol.style.Stroke({
                color: '#809848',
                width: 2,
            }),
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({
                    color: '#B0CA87',
                }),
            }),
        }),
    });
    
    map.addLayer(vector);
    
    // Call functionality for the interaction
    
    /**@type {HTMLElement}*/
    let measureTooltipElement = null;
    
    function addInteraction(typeInt) {
        draw = new ol.interaction.Draw({
            source: source,
            type: typeInt,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(200, 200, 200, 0.6)',
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.6)',
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.3)',
                    }),
                }),
            }),
        });
        map.addInteraction(draw);
    
        createMeasureTooltip();
    
        /**@type {import("../src/ol/Feature.js").default}*/
        let sketch;
    
        draw.on('drawstart', function (evt){
            sketch = evt.feature;
    
            /**@type {import("../src/ol/coordinate.js").Coordinate|undefined}*/
            let tooltipCoord = evt.coordinate;
    
            sketch.getGeometry().on('change', function (evt){
                const geom = evt.target;
                let output;
                if (geom instanceof ol.geom.Polygon){
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString){
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                $(measureTooltipElement).html(output);
                measureTooltip.setPosition(tooltipCoord);
            });
        });
    
        draw.on('drawend', function () {
            $(measureTooltipElement).addClass('ol-tooltip ol-tooltip-static');
            measureTooltip.setOffset([0, -7]);
    
            sketch = null;
            measureTooltipElement = null;
            createMeasureTooltip();
        });
    };
    
    // Final math computations
    
    // Formatting for distance
    /**
     * @param {LineString} line
     * @return {string}
     */
    
    let formatLength = function (line) {
        let length = ol.sphere.getLength(line);
        let output;
        if (length > 100){
            output = Math.round((length / 1000) * 100) / 100 + '' + 'km';
        } else {
            output = Math.round(length * 100) / 100 + '' + 'm';
        }
        return output;
    };
    
    // Formatting for zones
    /**
     * @param {Polygon} polygon
     * @return {string}
     */
    
    let formatArea = function (polygon) {
        let area = ol.sphere.getArea(polygon);
        let output;
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + '' + ' km <sup>2</sup>';
        } else {
            output = Math.round(area * 100) / 100 + '' + ' m <sup>2</sup>';
        }
        return output;
    };
    
    // Creating a new tooltip for measuring
    
    function createMeasureTooltip() {
        if ($(measureTooltipElement).length) {
        $(measureTooltipElement).remove();
        }
        measureTooltipElement = $('<div>').addClass('ol-tooltip ol-tooltip-measure');
        measureTooltip = new ol.Overlay({
        element: measureTooltipElement[0],
        offset: [0, -15],
        positioning: 'bottom-center'
        });
        map.addOverlay(measureTooltip);
        }
        
    });