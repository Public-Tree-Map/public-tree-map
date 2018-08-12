# street-tree-map

Street Tree Map uses open datasets to document publicly owned street trees + landmark trees in Santa Monica, California

## Protocol for pull requests + code review

- Please review open issues and link your pull reuqest to the relevant issue.
- In your pull request, please list and explain all proposed changes to the code base (additions, deletions). If you reuse code from elsewhere, please make sure you've attributed it.
- Please apply all relevant labels to your pull request.
- Please request a review (either from a specific person or from the slack channel).
- Reviewers: please review all proposed changes, write comments and questions in line notes. Please review all updates made at your request.
- Reviewer and requester: please confirm with each other that the PR is ready to merge. Please make sure that the PR branch name documents the new changes. Please squash and merge.

## Running locally

Running this requires Python 3 and nodejs.

1. Install the Python requirements:

```bash
pip install -r requirements.txt
```

2. Install the Javascript requirements:

```bash
npm install
```

3. Build the project and install it into the flask app:

```bash
npm run flask:build
```

4. Start the application

```bash
python run.py
```

5. Navigate to `localhost:5000` in your browser.

## Data Sources

- [Biodiversity Heritage Library - API documentation](https://www.biodiversitylibrary.org/api2/docs/docs.html)
- [Calflora](http://www.calflora.org/)
- [California Invasive Plant Council](http://www.cal-ipc.org/plants/inventory/)
- [Canopy Tree Library](https://canopy.org/tree-info/canopy-tree-library/)
- [Encyclopedia of Life (EOL) - API documentation](http://eol.org/api)
- [Google Street View - API documentation](https://developers.google.com/maps/documentation/streetview/)
- [iNaturalist - API documentation](https://www.inaturalist.org/pages/api+reference)
- [Implementing and managing urban forests: A much needed conservation strategy to increase ecosystem services and urban wellbeing - open access PDF](https://www.sciencedirect.com/science/article/pii/S0304380017300960?via%3Dihub)
- [IUCN Red List of Threatened Species - API documentation](http://apiv3.iucnredlist.org/)
- [The Jepson Herbarium eFlora](http://ucjeps.berkeley.edu/eflora/)
- [LA City - Urban Forestry Division - Street Tree Selection Guide](http://bss.lacity.org/urbanforestry/streettreeselectionguide.htm)
- [LA Times' Neighborhood Profile](http://maps.latimes.com/neighborhoods/neighborhood/santa-monica/)
- [Missouri Botanical Garden - Plant Finder](http://www.missouribotanicalgarden.org/plantfinder/plantfindersearch.aspx)
- [The Plant List](http://www.theplantlist.org/)
- [Santa Monica - Open Data - Neighborhood Organization Boundaries](https://data.smgov.net/Public-Assets/Neighborhood-Organization-Boundaries/juzu-tcbz/data)
- [Santa Monica - Open Data - Trees](https://data.smgov.net/Public-Assets/Trees/ekya-mi9c)
- [Santa Monica - Open Data - Trees Inventory](https://data.smgov.net/Public-Assets/Trees-Inventory/w8ue-6cnd)
- [Santa Monica - Urban Forest - Heritage Trees](https://www.smgov.net/Portals/UrbanForest/content.aspx?id=53687092939)
- [Santa Monica - Urban Forest - Landmark Trees](https://www.smgov.net/Portals/UrbanForest/content.aspx?id=53687091867)
- [Santa Monica - Urban Forest - Watering Frequencies for Mature Trees PDF (pp9-13)](https://www.smgov.net/uploadedFiles/Portals/UrbanForest/FINAL%20Trees%20Watering%20Guidelines.pdf)
- [Santa Monica - Urban Forest - Watering Street Trees in Santa Monica - Water Requirements by Species PDF (pp13-19)](https://www.smgov.net/uploadedFiles/Portals/UrbanForest/Maintenance/WateringStreetTrees.pdf)
- [SelecTree - CalPoly](https://selectree.calpoly.edu/)
- [Theodore Payne Foundation - California Native Plant Database](http://www.theodorepayne.org/mediawiki/index.php?title=California_Native_Plant_Library)

## Tree attributes and current sources

- [List of attribute fields and views for our application - gist](https://gist.github.com/Reltre/6554dfc430986803553d84742f1b88a9)
- Initial views (desktop):
  - 1 - no tree selected (home/map view)
  - 2 - native CFP tree species view
  - 3 - non-native tree species view
  - 4 - Washingtonia filifera (only native CFP palm species) view
  - 5 - non-native palm species view
  - 6 - tree family view
- Species Imagery - [Encyclopedia of Life](http://eol.org/api)
- CA Native status - [Calflora.org](www.calflora.org) and [Theodore Payne Foundation](http://www.theodorepayne.org/mediawiki/index.php?title=California_Native_Plant_Library)
- Nearest Address, GPS Coordinates, Height Range, Trunk Diameter (DBH) Range, Tree ID - [Trees Inventory - Santa Monica Open Data](https://data.smgov.net/Public-Assets/Trees-Inventory/w8ue-6cnd)
- Geographic Range description (countries occurrence), IUCN Red List Status - [IUCN Red List API - v3](http://apiv3.iucnredlist.org/)
- Recommended Watering Frequency - [City of Santa Monica Public Works Department PDF (pp9-13)](https://www.smgov.net/uploadedFiles/Portals/UrbanForest/FINAL%20Trees%20Watering%20Guidelines.pdf)
- Species Growth, Shade Production, Shedability, Spread, Trunk clearnance - [Canopy Tree Library](https://canopy.org/tree-info/canopy-tree-library/)
- Street View Imagery - [Google Street View](https://developers.google.com/maps/documentation/streetview/)
- For CA native species:
- Species Height by Width, Native Distribution, Native Habitat - [Theodore Payne Foundation](http://www.theodorepayne.org/mediawiki/index.php?title=California_Native_Plant_Library)
- For non-native tree species:
- Invasive Status - [California Invasive Plant Council](https://www.cal-ipc.org/plants/inventory/)
- Our public [google drive folder](https://drive.google.com/drive/u/1/folders/1PfSpH5yuydJEK-sD-PPTXcj9jHA6QLi4)

## Related projects/inspiration

- [A Very Detailed, Interactive Map of Chicago’s Tree Canopy (Atlas Obscura)](https://www.atlasobscura.com/articles/chicago-tree-canopy-map-2017)
- [Arnold Arboretum map explorer](https://arboretum.harvard.edu/explorer/?utm_source=topnav&utm_medium=nav&utm_campaign=top-menu-map)
- [Canopy](https://github.com/seeread/canopy) and descriptive [blog post](http://www.datakind.org/projects/out-on-a-limb-for-data) from DataKind
- [The effects of urban trees on air quality - USDA 2002 PDF](https://www.nrs.fs.fed.us/units/urban/local-resources/downloads/Tree_Air_Qual.pdf)
- [i-Tree](https://www.itreetools.org/)
- [Increased home size and hardscape decreases urban forest cover in Los Angeles County’s single-family residential neighborhoods PDF](http://johnwilson.usc.edu/wp-content/uploads/2018/03/Increased-home-size-and-hardscape-decreases-urban-forest-cover-in-Los-Angeles-Countys-single-family-residential-neighborhoods.pdf)
- [Jill Hubley's NYC street tree map](https://github.com/jhubley/street-trees)
- [Melbourne - Urban Forest Visual](http://melbourneurbanforestvisual.com.au/)
- [Minimum Requirements for an Arborist Report - City of Atlanta PDF](https://www.atlantaga.gov/home/showdocument?id=20151)
- [NYC Parks' New York City Street Tree Map](https://tree-map.nycgovparks.org/)
- [The Need to Standardize At-planting Data PDF](https://urbanforestry.indiana.edu/doc/publications/2015-need-to-standardize.pdf)
- [Pasadena Beautiful Foundation's Endangered Trees List](http://www.pasadenabeautiful.org/green-links/endangered-trees-list/)
- [Rancho Santa Ana Botanic Garden - app (Guru LLC)](https://itunes.apple.com/us/app/rancho-santa-ana-botanic-garde/id1389785599?mt=8)
- [RegisTree](http://www.vision.caltech.edu/registree/)
- [Santa Monica's Top 15 Tree Speices PDF (2010)](http://csmgisweb.smgov.net/docs/mapcatalog/trees.pdf)
- [TreeMapLA](https://www.opentreemap.org/latreemap/map/)
- [Urban Tree Growth & Longevity (UTGL) Working Group - Urban Tree Monitoring Protocols Field Guide](http://www.urbantreegrowth.org/field-guide.html)
- [We calculated how much money trees save for your city - The Conversation](http://theconversation.com/we-calculated-how-much-money-trees-save-for-your-city-95198)

* [List of attribute fields and views for our application - gist](https://gist.github.com/Reltre/6554dfc430986803553d84742f1b88a9)
* Initial views (desktop):
  - 1 - no tree selected (home/map view)
  - 2 - native CFP tree species view
  - 3 - non-native tree species view
  - 4 - Washingtonia filifera (only native CFP palm species) view
  - 5 - non-native palm species view
  - 6 - tree family view
* Species Imagery - [Encyclopedia of Life](http://eol.org/api)
* CA Native status - [Calflora.org](www.calflora.org) and [Theodore Payne Foundation](http://www.theodorepayne.org/mediawiki/index.php?title=California_Native_Plant_Library)
* Nearest Address, GPS Coordinates, Height Range, Trunk Diameter (DBH) Range, Tree ID - [Trees Inventory - Santa Monica Open Data](https://data.smgov.net/Public-Assets/Trees-Inventory/w8ue-6cnd)
* Geographic Range description (countries occurrence), IUCN Red List Status - [IUCN Red List API - v3](http://apiv3.iucnredlist.org/)
* Recommended Watering Frequency - [City of Santa Monica Public Works Department PDF (pp9-13)](https://www.smgov.net/uploadedFiles/Portals/UrbanForest/FINAL%20Trees%20Watering%20Guidelines.pdf)
* Species Growth, Shade Production, Shedability, Spread, Trunk clearnance - [Canopy Tree Library](https://canopy.org/tree-info/canopy-tree-library/)
* Street View Imagery - [Google Street View](https://developers.google.com/maps/documentation/streetview/)
* For CA native species:
* Species Height by Width, Native Distribution, Native Habitat - [Theodore Payne Foundation](http://www.theodorepayne.org/mediawiki/index.php?title=California_Native_Plant_Library)
* For non-native tree species:
* Invasive Status - [California Invasive Plant Council](https://www.cal-ipc.org/plants/inventory/)

## Related projects/inspiration

- [A Very Detailed, Interactive Map of Chicago’s Tree Canopy (Atlas Obscura)](https://www.atlasobscura.com/articles/chicago-tree-canopy-map-2017)
- [Arnold Arboretum map explorer](https://arboretum.harvard.edu/explorer/?utm_source=topnav&utm_medium=nav&utm_campaign=top-menu-map)
- [Canopy](https://github.com/seeread/canopy) and descriptive [blog post](http://www.datakind.org/projects/out-on-a-limb-for-data) from DataKind
- [The effects of urban trees on air quality - USDA 2002 PDF](https://www.nrs.fs.fed.us/units/urban/local-resources/downloads/Tree_Air_Qual.pdf)
- [i-Tree](https://www.itreetools.org/)
- [Increased home size and hardscape decreases urban forest cover in Los Angeles County’s single-family residential neighborhoods PDF](http://johnwilson.usc.edu/wp-content/uploads/2018/03/Increased-home-size-and-hardscape-decreases-urban-forest-cover-in-Los-Angeles-Countys-single-family-residential-neighborhoods.pdf)
- [Jill Hubley's NYC street tree map](https://github.com/jhubley/street-trees)
- [Melbourne - Urban Forest Visual](http://melbourneurbanforestvisual.com.au/)
- [Minimum Requirements for an Arborist Report - City of Atlanta PDF](https://www.atlantaga.gov/home/showdocument?id=20151)
- [NYC Parks' New York City Street Tree Map](https://tree-map.nycgovparks.org/)
- [The Need to Standardize At-planting Data PDF](https://urbanforestry.indiana.edu/doc/publications/2015-need-to-standardize.pdf)
- [Pasadena Beautiful Foundation's Endangered Trees List](http://www.pasadenabeautiful.org/green-links/endangered-trees-list/)
- [Rancho Santa Ana Botanic Garden - app (Guru LLC)](https://itunes.apple.com/us/app/rancho-santa-ana-botanic-garde/id1389785599?mt=8)
- [RegisTree](http://www.vision.caltech.edu/registree/)
- [Santa Monica's Top 15 Tree Speices PDF (2010)](http://csmgisweb.smgov.net/docs/mapcatalog/trees.pdf)
- [TreeMapLA](https://www.opentreemap.org/latreemap/map/)
- [Urban Tree Growth & Longevity (UTGL) Working Group - Urban Tree Monitoring Protocols Field Guide](http://www.urbantreegrowth.org/field-guide.html)
- [We calculated how much money trees save for your city - The Conversation](http://theconversation.com/we-calculated-how-much-money-trees-save-for-your-city-95198)
