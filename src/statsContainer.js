import React, { Component } from 'react';
import './StatsContainer.css'
import { Row, Column } from 'react-foundation';

export default class StatsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species: 'CA SYCAMORE',
            speciesTotal: 324,
            urbanForest: 'SM URBAN FOREST',
            perTotal: '1%',
            family: 'PLANE TREES',
            familyTotal: 1145,
            treePerTotal: '4%',
            treeCount: 14500,
        };
    }

    //first view is total trees in view
    //% of total native
    //# of species in view
    //% of species native
    //# of families in view
    //onClick to specific tree will show above stats for tree type

    render() {
        return (
            <Row className="StatContainer">
                <Column className="box">
                    <div className="stat">{this.state.treeCount}</div>
                    <div className="statInfo">TOTAL TREES IN VIEW</div>
                    <div></div>
                </Column>
                <Column className="box">
                    <div className="stat">{this.state.speciesTotal}</div>
                    <div className="statInfo">{this.state.species}</div>
                    <div className="KPCOFGS">Species</div>
                </Column>
                <Column className="box">
                    <div className="stat">{this.state.perTotal}</div>
                    <div className="statInfo">% OF TOTAL NATIVE</div>
                </Column>
                <Column className="box">
                    <div className="stat">{this.state.familyTotal}</div>
                    <div className="statInfo">{this.state.family}</div>
                    <div className="KPCOFGS">Family</div>
                </Column>
                <Column className="box">
                    <div className="stat">{this.state.treePerTotal}</div>
                    <div className="statInfo">{this.state.urbanForest}</div>
                    <div></div>
                </Column>
            </Row>
        )
    }
}

// <Grid
            //     className='container'
            //     templateColumns="repeat(4, 1fr)"
            //     autoRows="minmax(5em)"
            // >
            //     <GridItem column="1/2" className='box'>
            //         <div className='stat'>{this.state.speciesTotal}</div>
            //         <div className='number'>{this.state.species}</div>
            //         <div>Tree Species</div>
            //     </GridItem>
            //     <GridItem column="2/3" className='box'>
            //         <div className='stat'>{this.state.perTotal}</div>
            //         <div className='number'>{this.state.urbanForest}</div></GridItem>
            //     <GridItem column="3/4" className='box'>
            //         <div className='stat'>{this.state.familyTotal}</div>
            //         <div className='number'>{this.state.family}</div>
            //         <div>Tree Family</div>
            //     </GridItem>
            //     <GridItem column="4/5" className='box'>
            //         <div className='stat'>{this.state.treePerTotal}</div>
            //         <div className='number'>{this.state.urbanForest}</div></GridItem>
            // </Grid>