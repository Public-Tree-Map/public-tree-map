var app = this.app || {};

(function(module) {

  module.palettes = {
    'nativity': {
      'generated': false,
      'field'    : 'nativity',
      'native'   : '#ff0000',
      'exotic'   : '#0000ff',
      'default'  : '#000000'
    },
    'name_common': {
      'generated': true,
      'field'    : 'name_common'
    },
    'family_name_botanical': {
      'generated': true,
      'field'    : 'family_name_botanical',
      'Arecaceae'   : '#ff0000',
      'default'  : '#000000'
    },
    'irrigation_requirements': {
      'generated': false,
      'field'    : 'irrigation_requirements',
      'none, once established'   : '#458EBF',
      'minimal'   : '#1772EC',
      'moderate'   : '#0B3BCF',
      'high'   : 'purple',
      'Unknown'   : '#FFFFFF',
      'default'  : '#000000'
    },
    'shade_production': {
      'generated': false,
      'field'    : 'shade_production',
      'little, none'   : '#FC8FD7',
      'little'   : '#864EAF',
      'filtered'    : '#864EAF',
      'filtered, dense'    : '#618DFF',
      'dense'    : '#365BB7',
      'default'  : '#000000'
    },
    'iucn_status': {
      'generated': false,
      'field'    : 'iucn_status',
      'Critically Endangered' : '#33111B',
      'Endangered' : '#5B0020',
      'Vulnerable'   : '#7D0027',
      'Near Threatened'   : '#B90022',
      'Lower Risk/conservation dependent'   : '#DF0007',
      'Lower Risk/near threatened'   : '#C4C4C4',
      'Least Concern'   : '##FC7700',
      'Data Deficient' : '#FDA942',
      'not listed'  : '#FFFFFF',
      'default'  : '#000000'
    },
    'height_min_ft': {
      'generated': false,
      'field'    : 'height_min_ft',
      '1'   : '#44AEC4',
      '15'   : '#44AEC4',
      '30'   : '#54C6FF',
      '45'   : '#3E83BF',
      '60'   : '#2E5C85',
      'default'  : '#000000'
    },
    'diameter_min_in': {
      'generated': false,
      'field'    : 'diameter_min_in',
      '0'   : '#2ECB82',
      '7'   : '#FFFFFF',
      '13'   : '#52A106',
      '19'   : '#19754B',
      '25'   : '#146067',
      '31'   : '#0C3E43',
      'default'  : '#000000'
    },
  }

})(app);
