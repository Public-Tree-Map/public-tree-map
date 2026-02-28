var app = this.app || {};

(function(module) {

    function Geolocation(map) {
        var input = document.querySelector('#address-input');
        var container = document.querySelector('.address-container');
        var dropdown = null;
        var activeIndex = -1;
        var debounceTimer = null;

        function zoomToLatLng(latlng) {
            var currentZoom = map.leafletMap.getZoom();
            var targetZoom = currentZoom > 16 ? currentZoom : 18;
            map.leafletMap.flyTo(latlng, targetZoom, { animate: true });
        }

        function createDropdown() {
            removeDropdown();
            dropdown = document.createElement('ul');
            dropdown.className = 'autocomplete-dropdown';
            container.appendChild(dropdown);
            activeIndex = -1;
        }

        function removeDropdown() {
            if (dropdown) {
                dropdown.remove();
                dropdown = null;
                activeIndex = -1;
            }
        }

        function shortenName(displayName) {
            var exclude = ['United States', 'California', 'USA'];
            var parts = displayName.split(', ').filter(function(part) {
                var trimmed = part.trim();
                return exclude.indexOf(trimmed) === -1 && !/\bCounty$/.test(trimmed);
            });
            // Merge leading house number with street name (e.g. "1003", "12th Street" → "1003 12th Street")
            if (parts.length >= 2 && /^\d+$/.test(parts[0].trim())) {
                parts[0] = parts[0].trim() + ' ' + parts[1].trim();
                parts.splice(1, 1);
            }
            return parts.join(', ');
        }

        function selectResult(result) {
            var lat = parseFloat(result.lat);
            var lng = parseFloat(result.lon);
            var name = shortenName(result.display_name);
            input.value = name;
            removeDropdown();
            zoomToLatLng([lat, lng]);
            map.setPin(lat, lng, name);
        }

        function renderResults(results) {
            createDropdown();
            if (results.length === 0) {
                var li = document.createElement('li');
                li.className = 'autocomplete-item';
                li.textContent = 'No results found';
                li.style.color = '#999';
                dropdown.appendChild(li);
                return;
            }

            results.forEach(function(result, i) {
                var li = document.createElement('li');
                li.className = 'autocomplete-item';
                li.textContent = shortenName(result.display_name);
                li.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    selectResult(result);
                });
                dropdown.appendChild(li);
            });
        }

        function updateActive() {
            if (!dropdown) return;
            var items = dropdown.querySelectorAll('.autocomplete-item');
            items.forEach(function(item, i) {
                item.classList.toggle('active', i === activeIndex);
            });
            if (items[activeIndex]) {
                items[activeIndex].scrollIntoView({ block: 'nearest' });
            }
        }

        function fetchSuggestions(query) {
            var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' +
                encodeURIComponent(query) + '&limit=5' +
                '&viewbox=-118.8,34.4,-117.6,33.6&bounded=1';

            fetch(url, {
                headers: { 'User-Agent': 'PublicTreeMap (https://github.com/Public-Tree-Map)' }
            })
            .then(function(res) { return res.json(); })
            .then(function(results) {
                if (input.value.length >= 3) {
                    renderResults(results);
                }
            })
            .catch(function() {
                removeDropdown();
            });
        }

        input.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            var query = input.value.trim();
            if (query.length < 3) {
                removeDropdown();
                return;
            }
            debounceTimer = setTimeout(function() {
                fetchSuggestions(query);
            }, 300);
        });

        input.addEventListener('keydown', function(e) {
            if (!dropdown) return;
            var items = dropdown.querySelectorAll('.autocomplete-item');
            if (items.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = (activeIndex + 1) % items.length;
                updateActive();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = (activeIndex - 1 + items.length) % items.length;
                updateActive();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeIndex >= 0) {
                    items[activeIndex].dispatchEvent(new MouseEvent('mousedown'));
                }
            } else if (e.key === 'Escape') {
                removeDropdown();
            }
        });

        document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
                removeDropdown();
            }
        });

        document.getElementById('locate-button').addEventListener('click', function() {
            map.triggerLocate();
        });

        // Mobile search FAB + overlay
        if (window.innerWidth <= 890) {
            var fab = document.createElement('button');
            fab.className = 'mobile-search-fab';
            fab.innerHTML = '<i class="fa fa-search"></i>';
            fab.setAttribute('aria-label', 'Search address');
            document.body.appendChild(fab);

            var overlay = document.getElementById('mobile-search-overlay');
            var mobileInput = document.getElementById('mobile-address-input');
            var mobileResults = document.getElementById('mobile-search-results');
            var mobileClose = document.getElementById('mobile-search-close');
            var mobileDebounce = null;

            fab.addEventListener('click', function() {
                overlay.classList.remove('hidden');
                mobileInput.value = '';
                mobileResults.innerHTML = '';
                setTimeout(function() { mobileInput.focus(); }, 100);
            });

            mobileClose.addEventListener('click', function() {
                overlay.classList.add('hidden');
                mobileInput.blur();
            });

            mobileInput.addEventListener('input', function() {
                clearTimeout(mobileDebounce);
                var query = mobileInput.value.trim();
                if (query.length < 3) {
                    mobileResults.innerHTML = '';
                    return;
                }
                mobileDebounce = setTimeout(function() {
                    var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' +
                        encodeURIComponent(query) + '&limit=5' +
                        '&viewbox=-118.8,34.4,-117.6,33.6&bounded=1';

                    fetch(url, {
                        headers: { 'User-Agent': 'PublicTreeMap (https://github.com/Public-Tree-Map)' }
                    })
                    .then(function(res) { return res.json(); })
                    .then(function(results) {
                        mobileResults.innerHTML = '';
                        if (results.length === 0) {
                            var li = document.createElement('li');
                            li.textContent = 'No results found';
                            li.style.color = '#999';
                            mobileResults.appendChild(li);
                            return;
                        }
                        results.forEach(function(result) {
                            var li = document.createElement('li');
                            var name = shortenName(result.display_name);
                            li.textContent = name;
                            li.addEventListener('click', function() {
                                var lat = parseFloat(result.lat);
                                var lng = parseFloat(result.lon);
                                zoomToLatLng([lat, lng]);
                                map.setPin(lat, lng, name);
                                overlay.classList.add('hidden');
                                mobileInput.blur();
                            });
                            mobileResults.appendChild(li);
                        });
                    })
                    .catch(function() {
                        mobileResults.innerHTML = '';
                    });
                }, 300);
            });
        }
    }

    // Exports
    module.Geolocation = Geolocation;

})(app);
