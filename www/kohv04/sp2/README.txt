kohv04 - New proposal
Vzhledem ke složitosti starého návrhu je má konečná seminární práce trochu odlišná.
Zde jsem sepsal její nové parametry a funkcionality.

email: kohv04@vse.cz
xname: kohv04
link na Github: https://github.com/vitax10

Slovní popis aplikace:
Jedná se o mapovací aplikaci, která je založena na Openlayers.
Prozkoumává různé funkcionality, které lze vytvořit v tomto prostředí.

Funkční požadavky:
Aplikace má základní vrstvu na bázi Open Street Map.
Aplikace zobrazuje i další vektorové vrstvy pomocí GeoJSON a JSON souborů + 1 vrstva je přidána pomocí AJAXU.
V aplikaci se dá zobrazovat mapa klasickým způsobem.
V aplikaci se dá překlikávat mezi načtenými vrstvami.
Aplikace zobrazuje zeměpisnou délku a šířku na kurzoru.
Aplikace zobrazuje škálu našeho zobrazení mapy.
Aplikace se dá překliknout do řežimu celé obrazovky.
V aplikaci se dá přepnout náš pohled na "Home View", takové základní view zobrazující Evropu a ČR.
V aplikaci se dá měřit délka a velikost určité oblasti v m či km pomocí vykreslení na mapě.
Nakonec se v aplikaci dá zapnout mód geolokace, kdy uvidíme vlastní polohu. 
+ Po 30 sekundách při zaplé poloze se vrátíme zpátky na naši stávající polohu. 
+ Poloha vykresluje i okruh s přesností geolokace.

Popis zvolených služeb REST API:
Geocoding REST API - Bereme odsud určité lokace.- https://wiki.openstreetmap.org/wiki/Nominatim

Použité knihovny:
Openlayers - https://openlayers.org/ , https://openlayers.org/doc/
JQuery - https://jquery.com/ , https://api.jquery.com/
Mapbox - https://www.mapbox.com/ , https://docs.mapbox.com/
Geolocation - Dostupné v prohlížečích. 
Canvas - Dostupné v prohlížečích.
Fullscreen - Dostupné v prohlížečích.





