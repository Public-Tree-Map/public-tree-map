// a temporary tree object to pass in to SingleTree as props in development,
// until a tree can be fetched from the API

export const tree = {
  commonName: 'California Sycamore',
  speciesName: 'Platanus Racemosa',
  image: 'http://localhost:3000/static/media/logo.dcb71d68.png',
  location: {
    nearestAddress: {
      street: '1430 Olympic Blvd',
      city: 'Santa Monica, CA 90404',
    },
    treeId: '10924195',
    streetViewImage: '<image source url>',
  },
  size: {
    heightRange: '45 - 60 feet',
    trunkDiameterRange: '19 - 24 inches',
    speciesHeightByWidth: '30 - 80 feet tall by 30 feet wide',
  },
  treeValue: {
    treesToReplace: '25 new trees',
    shadeProduction: 'filtered',
    shedability: 'Deciduous',
  },
  careAndActivity: {
    recommendedWatering: '3x per month (April-October)',
    nextCityMaintenance: 'Pruning, scheduled for August 2019',
    managementUnit: '#202',
  },
  inSantaMonica: {
    thisSpecies: '365 trees, 1% of urban forest',
    planeFamily: '983 trees, 3% of urban forest',
  },
  origin: {
    origin: 'Native to California',
    nativeDistribution:
      'Central and Southern Foothills of Sierra Nevada, Tehachapi, Central Valley, Central West, Southwest, Baja California',
    naturalHabitat: 'Streamsides, Canyons',
    funFact:
      'Important for Western Tiger Swallowtail Butterfly and other butterflies, hummingbirds',
  },
};
