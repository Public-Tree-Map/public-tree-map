var app = this.app || {};

(function(module) {

  module.palettes = {
    'nativity': {
      'generated': false,
      'field'    : 'nativity',
      'native'   : { 'color': '#40AD75', 'title': 'Native to California' },
      'exotic'   : { 'color': '#fc9272', 'title': 'Not Native to California' },
      'default'  : '#bdbdbd'
    },
    'name_common': {
      'generated': true,
      'field'    : 'name_common'
    },
    'family_name_botanical': {
      'generated': false,
      'field'    : 'family_name_botanical',
      'Adoxaceae': {'color': '#9D848E', 'title': ''},
      'Altingiaceae': {'color': '#2EA785', 'title': ''},
      'Anacardiaceae': {'color': '#A47149', 'title': ''},
      //'Apocynaceae':
      'Aquifoliaceae': {'color': '#0F9D76', 'title': ''},
      //'Araliaceae':
      'Araucariaceae': {'color': '#63A19C', 'title': ''},
      'Arecaceae': { 'color': '#AFAF5E', 'title': '' },
      'Asparagaceae': {'color': '#D2CDB4', 'title': ''},
      'Betulaceae': {'color': '#DDD5C7', 'title': ''},
      'Bignoniaceae': {'color': '#9B7DD4', 'title': ''},
      //'Casuarinaceae':
      'Celastraceae': {'color': '#D93744', 'title': ''},
      'Cupressaceae': {'color': '#545A3E', 'title': ''},
      //'Cyatheaceae':
      //'Ebenaceae':
      'Ericaceae': {'color': '#B7C0D6', 'title': ''},
      'Fabaceae': {'color': '#82B185', 'title': ''},
      'Fagaceae': {'color': '#12674A', 'title': ''},
      //'Ginkgoaceae':
      'Juglandaceae': {'color': '#776A5F', 'title': ''},
      'Lauraceae': {'color': '#ADBBA1', 'title': ''}, //alt: avocado 676232//
      //'Lythraceae':
      //'Magnoliaceae': {'color': '#FDB462', 'title': ''},
      'Malvaceae': {'color': '#DD3848', 'title': ''},
      'Meliaceae': {'color': '#824D46', 'title': ''},
      //'Menispermaceae':
      'Musaceae': {'color': '#FCB953', 'title': ''},
      'Moraceae': {'color': '#532D3B', 'title': ''},
      'Myrtaceae': { 'color': '#4F6B58', 'title': ''},
      'Oleaceae': {'color': '#73714E', 'title': ''},
      'Pinaceae': { 'color': '#3A795E', 'title': ''},
      //'Pittosporaceae':
      'Platanaceae': { 'color': '#35463D', 'title': ''},
      'Podocarpaceae': {'color': '#008C45', 'title': ''},
      //'Proteaceae':
      //'Quillajaceae':
      'Rosaceae': {'color': '#813639', 'title': ''},
      'Rutaceae': { 'color': '#F9AC2F', 'title': ''},
      'Salicaceae': {'color': '#8E4483', 'title': ''},
      'Sapindaceae': {'color': '#C9A38D', 'title': ''},
      //'Scrophulariaceae':
      //'Simaroubaceae':
      'Strelitziaceae': {'color': '#FF8C55', 'title': ''},
      'Ulmaceae': {'color': '#547053', 'title': ''},
      //'Verbenaceae':
      'default'  : '#ffffff'
      //view palette: https://www.colorzilla.com/colors/9D848E+2EA785+A47149+0F9D76+63A19C+AFAF5E+D2CDB4+DDD5C7+9B7DD4+D93744+545A3E+B7C0D6+82B185+12674A+776A5F+ADBBA1+DD3848+824D46+FCB953+532D3B+4F6B58+73714E+3A795E+35463D+008C45+813639+F9AC2F+8E4483+C9A38D+FF8C55+547053+colors
    },
    'irrigation_requirements': {
      'generated'             : false,
      'field'                 : 'irrigation_requirements',
      'none, once established': { 'color': '#80ACFF', 'title': 'None, Once Established' },
      'minimal'               : { 'color': '#1266FB', 'title': 'Minimal' },
      'moderate'              : { 'color': '#0C35B4', 'title': 'Moderate' },
      'high'                  : { 'color': '#161650', 'title': 'Hight' },
      'Unknown'               : { 'color': '#ACACAC', 'title': 'Unknown' },
      'default'               : '#000000',
    },
    'shade_production': {
      'generated'      : false,
      'field'          : 'shade_production',
      'little, none'   : { 'color': '#FC8FD7', 'title': 'Litte, None' },
      'little'         : { 'color': '#864EAF', 'title': 'Little' },
      'filtered'       : { 'color': '#864EAF', 'title': 'Filtered' },
      'filtered, dense': { 'color': '#618DFF', 'title': 'Filtered, Dense' },
      'dense'          : { 'color': '#365BB7', 'title': 'Dense' },
      'default'        : '#000000'
    },
    'iucn_status': {
      'generated'                        : false,
      'field'                            : 'iucn_status',
      'Critically Endangered'            : { 'color': '#33111B', 'title': 'Critically Endangered' },
      'Endangered'                       : { 'color': '#5B0020', 'title': 'Endangered' },
      'Vulnerable'                       : { 'color': '#7D0027', 'title': 'Vulernable' },
      'Near Threatened'                  : { 'color': '#B90022', 'title': 'Near Threatened' },
      'Lower Risk/conservation dependent': { 'color': '#DF0007', 'title': 'Lower Risk/Conservation Dependent' },
      'Lower Risk/near threatened'       : { 'color': '#C4C4C4', 'title': 'Lower Risk/Near Threatened' },
      'Least Concern'                    : { 'color': '#FC7700', 'title': 'Least Concern' },
      'Data Deficient'                   : { 'color': '#FDA942', 'title': 'Data Deficient' },
      'not listed'                       : { 'color': '#FFFFFF', 'title': 'Not Listed' },
      'default'                          : '#000000'
    },
    'height_min_ft': {
      'generated': false,
      'field'    : 'height_min_ft',
      '1'        : { 'color': '#44AEC4', 'title': '1 ft' },
      '15'       : { 'color': '#44AEC4', 'title': '15 ft' },
      '30'       : { 'color': '#54C6FF', 'title': '30 ft' },
      '45'       : { 'color': '#3E83BF', 'title': '45 ft' },
      '60'       : { 'color': '#2E5C85', 'title': '60 ft' },
      'default'  : '#000000'
    },
    'ipc_rating': {
      'generated': false,
      'field'    : 'ipc_rating',
      'moderate' : { 'color': '#BC0000', 'title': 'Moderate' },
      'watch'    : { 'color': '#FF8202', 'title': 'Watch' },
      'limited'  : { 'color': '#FE0000', 'title': 'Limited' },
      'default'  : '#bdbdbd'
    },
  }
})(app);
