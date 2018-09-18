import React from 'react';

export const SingleTree = props => {
  return (
    <div className="singleTreeView">
      <div className="basicInfo">
        <h1>{props.tree.commonName}</h1>
        <p>{props.tree.speciesName}</p>
        <img src={props.tree.image} alt={props.tree.commonName} />
      </div>
    </div>
  );
};
