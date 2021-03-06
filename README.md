# The Green Alliance
Team 4909's 2018+ Scouting System.

The Green Alliance Scouting Platform has been designed from the ground up to enable teams to share data beyond any event, district, or region. This influx of data is especially beneficial to teams at higher levels of play as they have more data to reference in strategic decisions and picking alliance partners. TGA consists of a cross-platform application and a community of FIRSTers willing to gather scouting data for the collective.

## Supported Hardware
The Green Alliance tries to accomodate the workflows of most teams by supporting a variety of configurations.

### Recommended Hardware
- 6x [Kindle Fire](http://a.co/7w5EHTq) 
- [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
- Laptop w/ Ethernet Port

### Supported Devices
- Hybrid(Online/Offline) Usage
  - **Android Devices(v4.1+)** Connected to **Raspberry Pi 3**
    - Connected via **Bluetooth 4.0+** (max. of six devices per Pi)
      - Additional Raspberry Pi's may be tethered via **Ethernet** switch
  - Laptops Connected to **Raspberry Pi 3**
    - Connected via **Ethernet** switch
- Online Usage Only
  - Devices (Laptop/Tablet/Phone) Connected to Cloud CouchDB Server
    - Connected via Event WiFi or Cellular
    
## Platform Architecture
![](https://i.imgur.com/E78J5CI.png)

### Syncing within the TGA Platform
All devices run either [CouchDB](https://github.com/apache/couchdb) or [PouchDB](https://github.com/pouchdb/pouchdb) to store and sync data. The Bluetooth transfer protocol uses the [pouchdb-replication-stream](https://github.com/pouchdb-community/pouchdb-replication-stream) project to tunnel the API calls between the Kindle Fires and the Raspberry Pi CouchDB server.

When connected, devices will connect and sync data to reach [eventual consistency](http://docs.couchdb.org/en/2.1.1/intro/consistency.html).

### Hosted Infrastructure
- Web Hosting via [GitHub Pages](https://pages.github.com)
- CouchDB on Azure VM

### Offline Usage
All data will be replicated locally in PouchDB or CouchDB, while the website will be cached for offline access using HTML5 [AppCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache)
<!--and [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).-->

### Third-Party Data
To help scouts, TGA will reference third-party APIs to obtain team names, event schedules and official match results using the [TBA API v3](https://github.com/fletch3555/tba-api-client-javascript) and [FMS Events API v2](https://frcevents2.docs.apiary.io/#). If internet access is not available or should circumstances change, manual override will also be supported.

### Accessing the Database
To leverage the data collected by TGA for additional analysis, you may __replicate__ from the TGA CouchDB server using your existing credentials. The data is stored in a [JSON](https://www.json.org) format.

TGA CouchDB Server: `tga-cloud.team4909.org:5984`

If you need credentials, please contact us at `team4909@gmail.com`

## Scout Input Interface Design
### General Data Points
- Match Data
  - Event (cached text input)
  - Match Type (radio buttons)
    - Q   (Qualification)
    - QF  (Quarterfinal)
    - SF  (Semifinal)
    - F   (Final)
    - R   (Replay)
  - Match # (# input)
  - Team # Scouted (# input)
- Scout Metadata
  - Team # Scouting (cached # input)
  - Scout Initials (text input)
- Common Notes (checkboxes)
  - Brownout  
  - Foul
  - Red Card
  - Yellow Card
### Supported Game-Specific Data Entry Methods
- Counter w/ Stepper Buttons
- Checkboxes
- Radio Buttons
- SVG Button Map

## Analysis Portal Interface Design
- [ ] Dashboard (Home)
  - [X] Upcoming Match Finder (Editable)
    - [X] Team #
  - [X] Upcoming Match Metadata (API Dependent)
    - [X] Match #
    - [X] Time
  - [X] Upcoming Match Metadata (API Independent)
    - [X] Alliance Station
  - [ ] Alliance Breakdowns
    - [ ] Averages
    - [ ] Maximums
  - [ ] Team Breakdowns
    - [ ] Averages
- [ ] Team Averages
  - [ ] Alliance Picklist Creation Utility
- [ ] Scouting Input
<hr>

- [ ] Graph (Scatter Plot)
  - [ ] Alliance Picklist Creation Utility
- [ ] Alliance Selection
  - [ ] Locally Stored Picklist, Guides Alliance Selection Process
- [ ] Match Schedule
  - [X] Fetched from TBA/FIRST using Event Key

## Data Transaction Mechanisms  
- [X] Event WiFi / Cellular Data (Device <-> Cloud)
- [ ] Bluetooth SPP (Tablets <-> Pi)
- [X] Ethernet (Laptops <-> Pi)
<hr>

- [ ] 6LoWPAN (Pi <-> Pi)

## Bugs / Feature Requests
Please create a GitHub issue for any bugs or new feature requests.

## Community
- [Contribute to TGA](CONTRIBUTING.md) 
- [Join our Slack Group](https://join.slack.com/t/thegreenalliance/shared_invite/enQtMjkxNzYyNDQ5ODg4LTk4NTQ0ZjU3NGU3YzMwZjhiNTcyYTE2MzYzNDAzZTg5MzcxZWVlYzhkNGExZDhhNWVjY2YxMjlkOGZhYTY5OGU)
