# Public Tree Map

## Local Development

### TreeAPI
- **Base URL:** `http://127.0.0.1:8080/`
- Hot reload enabled
- `API_URL` is set in `public/js/main.js`

### Endpoints

| Method | Path | Description | Response |
|--------|------|-------------|----------|
| GET | `/species/all` | All species with counts | `[{common_name, botanical_name, id, cnt}]` |
| GET | `/species/{species_id}` | Tree locations for a species | `[{latitude, longitude}]` |
| GET | `/tree/{tree_id}` | Single tree details | `{name_common, name_botanical, latitude, longitude, address, heritage, images, ...}` |
| GET | `/trees/?lat1=...&lng1=...&lat2=...&lng2=...&lat3=...&lng3=...&lat4=...&lng4=...` | Trees in a bounding polygon (4 corners) | `[{tree_id, name_common, name_botanical, family_name_botanical, nativity, latitude, longitude, heritage, ...}]` |
| GET | `/random/` | Heatmap data (optional `?species_id=N` repeated for filtering) | `[{lat, lng, intensity}]` |
| GET | `/cities/` | Tree counts per city with centroid lat/lng | `[{city, count, lat, lng}]` |

## Project Structure

- `public/index.html` — main HTML, loads all JS and Leaflet/Select2 dependencies
- `public/js/main.js` — app entry point, sets API_URL, initializes components
- `public/js/Map.js` — Leaflet map, heatmap, tree markers, bounding-box fetching
- `public/js/SpeciesFilter.js` — Select2 species dropdown, formats species for display
- `public/js/Sidebar.js` — sidebar tree detail view
- `public/js/ColorFilter.js` — "Group By" toggle (Species, Native, etc.)
- `public/js/Legend.js` — legend/color key for map
- `public/js/Palettes.js` — color palette definitions
- `public/js/Geolocation.js` — user location feature
