import React from 'react';
import './SingleTree.css';

export const SingleTree = props => {
  return (
    <div className="singleTreeView">
      <div className="basicInfo">
        <h1>{props.tree.commonName}</h1>
        <p>{props.tree.speciesName}</p>
        <img src={props.tree.image} alt={props.tree.commonName} />
      </div>
      <div className="locationInfo">
        <h4>Location</h4>
        <p className="propertyLabel">Nearest Address:</p>
        <p>
          {props.tree.location.nearestAddress.street}
          <br />
          {props.tree.location.nearestAddress.city}
        </p>
        <p className="propertyLabel">Tree ID:</p>
        <p>{props.tree.location.treeId}</p>
        <img
          src={props.tree.location.streetViewImage}
          alt="Street View Image"
        />
      </div>
      <div className="sizeInfo">
        <h4>Size</h4>
        <p className="propertyLabel">Height Range:</p>
        <p>{props.tree.size.heightRange}</p>
        <p className="propertyLabel">Trunk Diameter (DBH) Range:</p>
        <p>{props.tree.size.trunkDiameterRange}</p>
        <p className="propertyLabel">Species Height By Width:</p>
        <p>{props.tree.size.speciesHeightByWidth}</p>
      </div>
      <div className="valueInfo">
        <h4>Tree Value</h4>
        <p className="propertyLabel">Trees Required To Replace:</p>
        <p>{props.tree.treeValue.treesToReplace}</p>
        <p className="propertyLabel">Shade Production:</p>
        <p>{props.tree.treeValue.shadeProduction}</p>
        <p className="propertyLabel">Shedability:</p>
        <p>{props.tree.treeValue.shedability}</p>
      </div>
      <div className="activityInfo">
        <h4>Care {'\u0026'} Activity</h4>
        <p className="propertyLabel">
          Recommended Watering (For Mature Trees):
        </p>
        <p>{props.tree.careAndActivity.recommendedWatering}</p>
        <p className="propertyLabel">Next City Maintenance:</p>
        <p>{props.tree.careAndActivity.nextCityMaintenance}</p>
        <p className="propertyLabel">Management Unit:</p>
        <p>{props.tree.careAndActivity.managementUnit}</p>
      </div>
      <div className="santaMonicaInfo">
        <h4>In Santa Monica</h4>
        <p className="propertyLabel">This Species In Santa Monica:</p>
        <p>{props.tree.inSantaMonica.thisSpecies}</p>
        <p className="propertyLabel">Plane Family In Santa Monica:</p>
        <p>{props.tree.inSantaMonica.planeFamily}</p>
      </div>
      <div className="originInfo">
        <h4>Origin</h4>
        <p>Origin:</p>
        <p>{props.tree.origin.origin}</p>
        <p className="propertyLabel">Native Distribution In California:</p>
        <p>{props.tree.origin.nativeDistribution}</p>
        <p className="propertyLabel">Natural Habitat In California</p>
        <p>{props.tree.origin.naturalHabitat}</p>
        <p className="propertyLabel">Fun Fact:</p>
        <p>{props.tree.origin.funFact}</p>
      </div>
    </div>
  );
};
