var app = this.app || {};

(function(module) {

    var selectFilter = $('#species-filter');

    function SpeciesSearch(map) {
        this.selected = new Set();
        var realThis = this;
        selectFilter.on(
            "select2:select",
            function (e) {
                realThis.selected.add(e.params.data.commonName);
                map.setFilter(realThis.selected);
            }
        );
        selectFilter.on(
            "select2:unselect",
            function (e) {
                realThis.selected.delete(e.params.data.commonName);
                map.setFilter(realThis.selected);
            }
        );

    }

    function counter(hashmap, tree) {
        var tree_key = tree['name_common'].concat([' (', tree['name_botanical'], ')'].join(''));
        if (tree['name_common'] === 'Vacant Site'){

        }
        else if (hashmap.has(tree_key)) {
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
                }
            );
        }
        return hashmap;
    }

    function treeToStr(tree){
        return tree.commonName.concat([' (', tree.botanicalName, ')'].join(''))
    }

    SpeciesSearch.prototype.selectFormatter = function(trees){
        countedTrees = trees.reduce(counter, new Map());
        var countedTreesArray = Array.from(countedTrees).map(x => x[1]);
        return countedTreesArray.map(
            (tree, index) => ({id: index, text: treeToStr(tree), count: tree.count, botanicalName: tree.botanicalName, commonName: tree.commonName})
        );
    };

    function treeCompare(treeA, treeB){
        if (treeA.text > treeB.text){
            return 1
        }
        else if (treeA.text < treeB.text){
            return -1
        }
        return -1
    }

    SpeciesSearch.prototype.setSpecies = function(species) {
        this.species = Array.from(species).filter(s => s !== 'Vacant Site').sort(treeCompare);
        selectFilter.select2({
            placeholder: 'Filter species',
            data: this.species
        })
        // this.species.forEach(s => {
        //     var option = document.createElement('option');
        //     option.text  = s;
        //     option.value = s;
        //     filter.appendChild(option);
        // });
    };

    // Exports
    module.SpeciesSearch = SpeciesSearch;

})(app);
