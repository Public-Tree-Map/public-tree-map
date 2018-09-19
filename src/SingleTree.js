import React from 'react';
import './SingleTree.css';

export const SingleTree = props => {
  return (
    <div className="singleTreeView">
      <div className="basicInfo">
        <h1 className="treeTitle">{props.tree.commonName}</h1>
        <div className="properyDetails">{props.tree.speciesName}</div>
        <img src={props.tree.image} alt={props.tree.commonName} />
      </div>
      <div className="locationInfo">
        <h4>Location</h4>
        <div className="propertyLabel">Nearest Address:</div>
        <div className="properyDetails">
          {props.tree.location.nearestAddress.street}
          <br />
          {props.tree.location.nearestAddress.city}
        </div>
        <div className="propertyLabel">Tree ID:</div>
        <div className="properyDetails">{props.tree.location.treeId}</div>
        <img
          src={props.tree.location.streetViewImage}
          alt="Street View Image"
        />
      </div>
      <div className="sizeInfo">
        <h4>Size</h4>
        <div className="propertyLabel">Height Range:</div>
        <div className="properyDetails">{props.tree.size.heightRange}</div>
        <div className="propertyLabel">Trunk Diameter (DBH) Range:</div>
        <div className="properyDetails">
          {props.tree.size.trunkDiameterRange}
        </div>
        <div className="propertyLabel">Species Height By Width:</div>
        <div className="properyDetails">
          {props.tree.size.speciesHeightByWidth}
        </div>
      </div>
      <div className="valueInfo">
        <h4>Tree Value</h4>
        <div className="propertyLabel">Trees Required To Replace:</div>
        <div className="properyDetails">
          {props.tree.treeValue.treesToReplace}
        </div>
        <div className="propertyLabel">Shade Production:</div>
        <div className="properyDetails">
          {props.tree.treeValue.shadeProduction}
        </div>
        <div className="propertyLabel">Shedability:</div>
        <div className="properyDetails">{props.tree.treeValue.shedability}</div>
      </div>
      <div className="activityInfo">
        <h4>Care {'\u0026'} Activity</h4>
        <div className="propertyLabel">
          Recommended Watering (For Mature Trees):
        </div>
        <div className="properyDetails">
          {props.tree.careAndActivity.recommendedWatering}
        </div>
        <div className="propertyLabel">Next City Maintenance:</div>
        <div className="properyDetails">
          {props.tree.careAndActivity.nextCityMaintenance}
        </div>
        <div className="propertyLabel">Management Unit:</div>
        <div className="properyDetails">
          {props.tree.careAndActivity.managementUnit}
        </div>
      </div>
      <div className="santaMonicaInfo">
        <h4>In Santa Monica</h4>
        <div className="propertyLabel">This Species In Santa Monica:</div>
        <div className="properyDetails">
          {props.tree.inSantaMonica.thisSpecies}
        </div>
        <div className="propertyLabel">Plane Family In Santa Monica:</div>
        <div className="properyDetails">
          {props.tree.inSantaMonica.planeFamily}
        </div>
      </div>
      <div className="originInfo">
        <h4>Origin</h4>
        <div className="propertyLabel">Origin:</div>
        <div className="properyDetails">{props.tree.origin.origin}</div>
        <div className="propertyLabel">Native Distribution In California:</div>
        <div className="properyDetails">
          {props.tree.origin.nativeDistribution}
        </div>
        <div className="propertyLabel">Natural Habitat In California</div>
        <div className="properyDetails">{props.tree.origin.naturalHabitat}</div>
        <div className="propertyLabel">Fun Fact:</div>
        <div className="properyDetails">{props.tree.origin.funFact}</div>
      </div>
    </div>
  );
};
