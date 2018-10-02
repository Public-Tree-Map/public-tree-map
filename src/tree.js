// a temporary representation of a tree object reflecting the current
// proposed database schema. Values not currently represented in the schema:
// * zip_code
// * management_unit
// * next_city_maintenance
// * species.trees_to_replace
// * species.species_in_sm
// * species.fun_fact
// * species.plane_family_in_sm

export const tree = {
  street_number: '1430',
  street_name: 'Olympic Blvd.',
  zip_code: '90404',
  sm_id: '10924195',
  streetview_imagery: '<image source url>',
  height_min: '45',
  height_max: '60',
  dbh_min: '19',
  dbh_max: '24',
  management_unit: '#202',
  next_city_maintenance: 'Pruning, scheduled for August 2019',
  species: {
    common_name: 'California Sycamore',
    latin_name: 'Platanus Racemosa',
    eol_image: 'http://localhost:3000/static/media/logo.dcb71d68.png',
    species_height_x_width: '30 - 80 feet tall by 30 feet wide',
    trees_to_replace: '25',
    shade_production: 'Filtered',
    shedability: 'Deciduous',
    water_frequency: '3x per month (April-October)',
    species_in_sm: '365 trees, 1% of urban forest',
    ca_native: 'native',
    native_distribution:
      'Central and Southern Foothills of Sierra Nevada, Tehachapi, Central Valley, Central West, Southwest, Baja California',
    native_habitat: 'Streamsides, Canyons',
    fun_fact:
      'Important for Western Tiger Swallowtail Butterfly and other butterflies, hummingbirds',
  },
  family: {
    plane_family_in_sm: '983 trees, 3% of urban forest',
  },
};
