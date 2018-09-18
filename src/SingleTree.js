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
    </div>
  );
};
