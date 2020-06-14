var app = this.app || {};

(function(module) {

  module.palettes = {
    'nativity': {
      'generated': false,
      'field'    : 'nativity',
      'native'   : { 'color': '#55A860', 'title': 'Native to California' },
      'exotic'   : { 'color': '#fdbaa3', 'title': 'Not Native to California' },
      'moderate' : { 'color': '#fdbaa3', 'title': 'Moderate' },
      'watch'    : { 'color': '#fdbaa3', 'title': 'Watch' },
      'limited'  : { 'color': '#fdbaa3', 'title': 'Limited' },
      'default'  : '#bdbdbd'
    },
    'name_common': {
      'generated': true,
      'field'    : 'name_common'
    },
    'family_name_botanical': {
      'generated': true,
      'field'    : 'family_name_botanical',
      'Arecaceae': { 'color': '#ff0000', 'title': '' },
      'default'  : '#000000'
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
    'heritage': {
      'generated' : false,
      'field'     : 'heritage',
      'true'      : { 'color': '#679BBE', 'title': 'true' },
      'false'     : { 'color': '#FFFFFF', 'title': 'false' },
      'markerSize': 4,
    },
  }
})(app);
