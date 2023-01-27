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

Modifikace:
1. Snažil jsem se použít tuto mapu jako layer pro Darkmode: https://api.maptiler.com/maps/darkmatter/?key=rRDokw8lRfAhrZylUirr#0.17/0/36
, ale i po vyřešení všech errorů se jednoduše nenačetla. Ani přesně zkopírovaný kód nefungoval: 
https://docs.maptiler.com/openlayers/vector-maps-in-openlayers/?key=rRDokw8lRfAhrZylUirr&mapId=darkmatter&_gl=1*jttasn*_ga*MjAwNTYwMzE4Ny4xNjc0NzY3Nzcz*_ga_K4SXYBF4HT*MTY3NDc2Nzc3My4xLjEuMTY3NDc2OTcyNS40Ni4wLjA.&_ga=2.7723643.859335951.1674767774-2005603187.1674767773.
U jiných APIs jsou darkmode verze pouze v placených verzích pro vývoj.

Tak jsem nakonec přidal černobílý styl toner a terrain. Není to darkmode ale jsou to customizace.

2. Snažil jsem se udělat alespoň search bar pomocí ol-text class ol-searchnominatim, ale nefunguje to.
https://viglino.github.io/ol-ext/doc/doc-pages/ol.control.SearchNominatim.html

Opravy syntaxe:
a) Nepřišel jsem na to, jak to udělat aby to fungovalo v cyklu. 
Místo toho jsem udělal 1 funkci, ale stále musím pak vytvořit const za sebou.
b) párové tagy u img odstraněny.
c) konstanty pro URL odstraněny.
d) Udělal jsem variable pro crosshair takže teď nevybírám element sám o sobě, 
ale jeho varible. Nejspíš to nemění nic na tom, že to vybírám stále vícekrát.
e) Formátování kódu - Přidal jsem tab a spaces tam, kde má být.


Ukázat problem se search.



