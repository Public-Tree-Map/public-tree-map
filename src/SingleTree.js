import React from 'react';
import './SingleTree.css';
import { Row, Column, Callout } from 'react-foundation';

export const SingleTree = props => {
  return (
    <div className="singleTreeView">
      <Row className="basicInfo">
        <Column>
          <Callout>
            <h1 className="treeTitle">{props.tree.species.common_name}</h1>
            <div className="propertyDetails">
              {props.tree.species.latin_name}
            </div>
            <img
              src={props.tree.species.eol_image}
              alt={props.tree.species.common_name}
            />
          </Callout>
        </Column>
      </Row>
      <Row className="locationInfo">
        <Column>
          <Callout>
            <h4>Location</h4>
            <div className="propertyLabel">Nearest Address:</div>
            <div className="propertyDetails">
              {props.tree.street_number} {props.tree.street_name}
              <br />
              Santa Monica, CA {props.tree.zip_code}
            </div>
            <div className="propertyLabel">Tree ID:</div>
            <div className="propertyDetails">{props.tree.sm_id}</div>
            <img
              src={props.tree.streetview_imagery}
              alt={props.tree.species.common_name + ' Street View Image'}
            />
          </Callout>
        </Column>
      </Row>
      <Row className="sizeInfo">
        <Column>
          <Callout>
            <h4>Size</h4>
            <div className="propertyLabel">Height Range:</div>
            <div className="propertyDetails">
              {props.tree.height_min} - {props.tree.height_max} feet
            </div>
            <div className="propertyLabel">Trunk Diameter (DBH) Range:</div>
            <div className="propertyDetails">
              {props.tree.dbh_min} - {props.tree.dbh_max} inches
            </div>
            <div className="propertyLabel">Species Height By Width:</div>
            <div className="propertyDetails">
              {props.tree.species.species_height_x_width}
            </div>
          </Callout>
        </Column>
      </Row>
      <Row className="valueInfo">
        <Column>
          <Callout>
            <h4>Tree Value</h4>
            <div className="propertyLabel">Trees Required To Replace:</div>
            <div className="propertyDetails">
              {props.tree.species.trees_to_replace} new trees
            </div>
            <div className="propertyLabel">Shade Production:</div>
            <div className="propertyDetails">
              {props.tree.species.shade_production}
            </div>
            <div className="propertyLabel">Shedability:</div>
            <div className="propertyDetails">
              {props.tree.species.shedability}
            </div>
          </Callout>
        </Column>
      </Row>
      <Row className="activityInfo">
        <Column>
          <Callout>
            <h4>Care {'\u0026'} Activity</h4>
            <div className="propertyLabel">
              Recommended Watering (For Mature Trees):
            </div>
            <div className="propertyDetails">
              {props.tree.species.water_frequency}
            </div>
            <div className="propertyLabel">Next City Maintenance:</div>
            <div className="propertyDetails">
              {props.tree.next_city_maintenance}
            </div>
            <div className="propertyLabel">Management Unit:</div>
            <div className="propertyDetails">{props.tree.management_unit}</div>
          </Callout>
        </Column>
      </Row>
      <Row className="santaMonicaInfo">
        <Column>
          <Callout>
            <h4>In Santa Monica</h4>
            <div className="propertyLabel">This Species In Santa Monica:</div>
            <div className="propertyDetails">
              {props.tree.species.species_in_sm}
            </div>
            <div className="propertyLabel">Plane Family In Santa Monica:</div>
            <div className="propertyDetails">
              {props.tree.family.plane_family_in_sm}
            </div>
          </Callout>
        </Column>
      </Row>
      <Row className="originInfo">
        <Column>
          <Callout>
            <h4>Origin</h4>
            <div className="propertyLabel">Origin:</div>
            <div className="propertyDetails">
              {props.tree.species.ca_native === 'native'
                ? 'Native to California'
                : 'Exotic'}
            </div>
            {props.tree.species.ca_native === 'native' && (
              <div className="nativeInfo">
                <div className="propertyLabel">
                  Native Distribution In California:
                </div>
                <div className="propertyDetails">
                  {props.tree.species.native_distribution}
                </div>
                <div className="propertyLabel">
                  Natural Habitat In California
                </div>
                <div className="propertyDetails">
                  {props.tree.species.native_habitat}
                </div>
              </div>
            )}
            {props.tree.species.ca_native === 'exotic' && (
              <div className="exoticInfo">
                <div className="propertyLabel">Invasive Status:</div>
                <div className="propertyDetails">
                  {props.tree.species.invasive_status}
                </div>
              </div>
            )}
            <div className="propertyLabel">Fun Fact:</div>
            <div className="propertyDetails">{props.tree.species.fun_fact}</div>
          </Callout>
        </Column>
      </Row>
    </div>
  );
};
