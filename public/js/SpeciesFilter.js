var app = this.app || {};

(function(module) {
    var selectFilter = $('#species-filter');

    function SpeciesFilter(map) {
        this.formatOptions = formatOptions.bind(map);
        this.selected = new Set();
        var realThis = this;
        selectFilter.on("select2:select select2:unselect", function (event) {
            // Retrieve all selected items from Select2
            const selectedItems = $(this).select2('data');

            // Always filter by species name regardless of grouping mode
            const speciesIds = selectedItems.map(item => ({
                field: 'name_common',
                value: item.name_common,
                speciesId: Number(item.id)
            }));

            // Call map.setFilter with the current state of selected options
            map.setFilter(speciesIds);
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
