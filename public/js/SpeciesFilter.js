var app = this.app || {};

(function(module) {
    var selectFilter = $('#species-filter');

    function SpeciesFilter(map) {
        this.formatOptions = formatOptions.bind(map);
        this.selected = new Set();
        var realThis = this;
        selectFilter.on(
            "select2:select",
            function (event) {
                realThis.selected.add(event.params.data["name_common"]);
                map.setFilter(realThis.selected);
            }
        );
        selectFilter.on(
            "select2:unselect",
            function (e) {
                realThis.selected.delete(e.params.data["name_common"]);
                map.setFilter(realThis.selected);
            }
        );

    }

    function counter(hashmap, tree) {
        var tree_key = tree['name_common'].concat([' (', tree['name_botanical'], ')'].join(''));
        if (hashmap.has(tree_key)) {
            var currentCount = hashmap.get(tree_key);
            currentCount['count'] += 1;
            hashmap.set(tree_key,  currentCount);
        }
        else {
            hashmap.set(
                tree_key,
                {
                    count: 1,
                    botanicalName: tree['name_botanical'],
                    commonName: tree['name_common'],
                    familyBotanicalName: tree["family_name_botanical"],
                    nativity: tree.nativity,
                    iucnStatus: tree["iucn_status"],
                    heritage: tree.heritage,
                }
            );
        }
        return hashmap;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function treeToStr(tree){
        return tree.commonName.concat([' (', tree.botanicalName, ')', ' - ', numberWithCommas(tree.count)].join(''))
    }

    SpeciesFilter.prototype.selectFormatter = function(trees){
        countedTrees = trees.reduce(counter, new Map());
        var countedTreesArray = Array.from(countedTrees).map(x => x[1]);
        var selectArray = countedTreesArray.map(
            (tree, index) => ({
                id: index, 
                text: treeToStr(tree), 
                count: tree.count, 
                family_name_botanical: tree.familyBotanicalName, 
                name_common: tree.commonName, 
                nativity: tree.nativity, 
                iucn_status: tree.iucnStatus,
                heritage: tree.heritage,
            })
        );
        return Array.from(selectArray).sort(treeCompareAlpha);
    };

    function treeCompareAlpha(treeA, treeB){
        if (treeA.text > treeB.text){
            return 1
        }
        else if (treeA.text < treeB.text){
            return -1
        }
        return -1
    }

    SpeciesFilter.prototype.setSpecies = function(species) {
        this.species = species;
        selectFilter.select2({
            placeholder: 'Start typing a species name',
            data: this.species,
            templateSelection: this.formatOptions,
            templateResult: this.formatOptions,
        });
    };

    function formatOptions(selection) {
        var formatted = $(
            '<span> \
                <span class="color-key"/> \
                <span class="select2-selection-text"/> \
            </span>'
        );
        var alpha = Math.round(255 * this.fillOpacity).toString(16);
        var colorKey = formatted.find(".color-key");
        
        if (this.palette.field === 'heritage') {
            colorKey.addClass("hidden");
        } else {
            colorKey.removeClass("hidden");
        }
        colorKey.css("background-color", selection.legend + alpha);
        formatted.find(".select2-selection-text").text(selection.text);
        return formatted;
    }

    // Exports
    module.SpeciesFilter = SpeciesFilter;

})(app);
