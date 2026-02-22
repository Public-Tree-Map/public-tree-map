var app = this.app || {};

(function(module) {
    var selectFilter = $('#species-filter');

    function SpeciesFilter(map) {
        this.formatOptions = formatOptions.bind(map);
        this.selected = new Set();
        this.speciesById = {};
        var realThis = this;
        selectFilter.on("select2:select select2:unselect", function () {
            var selectedIds = $(this).val() || [];
            var selections = selectedIds.map(function(id) {
                var species = realThis.speciesById[id];
                return species ? species.name_common : null;
            }).filter(Boolean);
            map.setFilter(selections);
        });

    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function treeToStr(tree){
        return tree.common_name.concat([' (', tree.botanical_name, ')', ' - ', numberWithCommas(tree.cnt)].join(''))
    }

    SpeciesFilter.prototype.selectFormatter = function(trees){
        var selectArray = trees.map(
            (tree) => ({
                id: tree.id,
                text: treeToStr(tree),
                count: tree.cnt,
                family_name_botanical: tree.familyBotanicalName, 
                name_common: tree.common_name,
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
        this.speciesById = {};
        species.forEach(function(s) { this.speciesById[s.id] = s; }.bind(this));
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
