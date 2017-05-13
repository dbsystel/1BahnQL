# 1BahnQL
Single unified API for all DBOpenData APIs implemented with GraphQL. We implemented the following APIs: StaDa, FaSta, TimeTables, Flinkster, CallABike, ParkplätzeAPI, ReiseCenter

## Usage
### Install
`npm install`
### Run
`Authorization=<Your DBOpenData Athetication Token> node index.js`

## Datenquellen
### API:

- [x] Stationen (StaDa)
- [x] Fahrstühle (FaSta)
- [x] Fahrplan (Fahrplan-Free)
- [x] Flinkster 
- [ ] Betriebsstellen
- [x] Reisezentren
- [x] Parkplätze
- [ ] https://github.com/derhuerst/db-zugradar-client
- [ ] https://github.com/derhuerst/db-hafas
- [ ] https://github.com/derhuerst/generate-db-shop-urls
- [ ] https://github.com/derhuerst/find-db-station-by-name
- [ ] https://github.com/derhuerst/european-transport-modules
- [ ] https://github.com/derhuerst/vbb-lines
- [ ] https://github.com/derhuerst/db-stations

### Statisch:
- [ ] http://data.deutschebahn.com/dataset/data-bahnsteig
- [ ] http://data.deutschebahn.com/dataset/data-bahnsteig-regio
- [ ] http://data.deutschebahn.com/dataset/data-wagenreihungsplan-soll-daten
- [ ] http://data.deutschebahn.com/dataset/luftschadstoffkataster

## Root Queries

### Verbindungssuche

### Textsuche
- [x] Station
- [ ] Zug

### Geosuche
- [x] Station
- [ ] Bahnsteig
- [x] Flinkster
- [x] Call a Bike
- [x] Parkplätze
- [ ] Zug
- [ ] Fahrstühle / Rolltreppen

### ID Access
- [x] EvaId (Station)
- [ ] DS100 (BetrSt)
- [ ] Zug
- [ ] Flinkster
- [ ] Call a Bike
- [ ] Fahrstühle / Rolltreppen
- [x] Parkplätze
- [ ] Bahnsteig
