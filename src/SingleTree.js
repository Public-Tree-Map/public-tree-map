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
        <p>Nearest Address:</p>
        <p>
          {props.tree.location.nearestAddress.street}
          <br />
          {props.tree.location.nearestAddress.city}
        </p>
        <p>Tree ID:</p>
        <p>{props.tree.location.treeId}</p>
        <img
          src={props.tree.location.streetViewImage}
          alt="Street View Image"
        />
      </div>
      <div className="sizeInfo">
        <h4>Size</h4>
        <p>Height Range:</p>
        <p>{props.tree.size.heightRange}</p>
        <p>Trunk Diameter (DBH) Range:</p>
        <p>{props.tree.size.trunkDiameterRange}</p>
        <p>Species Height By Width:</p>
        <p>{props.tree.size.speciesHeightByWidth}</p>
      </div>
      <div className="valueInfo">
        <h4>Tree Value</h4>
        <p>Trees Required To Replace:</p>
        <p>{props.tree.treeValue.treesToReplace}</p>
        <p>Shade Production:</p>
        <p>{props.tree.treeValue.shadeProduction}</p>
        <p>Shedability:</p>
        <p>{props.tree.treeValue.shedability}</p>
      </div>
      <div className="activityInfo">
        <h4>Care {'\u0026'} Activity</h4>
        <p>Recommended Watering (For Mature Trees):</p>
        <p>{props.tree.careAndActivity.recommendedWatering}</p>
        <p>Next City Maintenance:</p>
        <p>{props.tree.careAndActivity.nextCityMaintenance}</p>
        <p>Management Unit:</p>
        <p>{props.tree.careAndActivity.managementUnit}</p>
      </div>
      <div className="santaMonicaInfo">
        <h4>In Santa Monica</h4>
        <p>This Species In Santa Monica:</p>
        <p>{props.tree.inSantaMonica.thisSpecies}</p>
        <p>Plane Family In Santa Monica:</p>
        <p>{props.tree.inSantaMonica.planeFamily}</p>
      </div>
    </div>
  );
};
