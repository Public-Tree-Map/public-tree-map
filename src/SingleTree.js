import React from 'react';

export const SingleTree = tree => {
  return (
    <div className="singleTreeView">
      <div className="basicInfo">
        <h1>{tree.commonName}</h1>
        <p>{tree.speciesName}</p>
        <img src={tree.image} alt={tree.commonName} />
      </div>
    </div>
  );
};
