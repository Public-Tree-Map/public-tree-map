import React, { Component } from 'react';
import { Grid, GridItem } from 'styled-grid-component';

export default class StatsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species: 'Birch',
            speciesTotal: 324,
            urbanForest: 'SM Urban Forest',
            perTotal: '1%',
            family: 'Plane Trees',
            familyTotal: 1145,
            treePerTotal: '4%',
        };
        //review passed down props/state
    }

    render() {
        return (
            <Grid
                style={styles.container}
                templateColumns="repeat(4, 1fr)"
                autoRows="minmax(5em)"
            >
                <GridItem column="1/2" style={styles.box}>
                    <div style={styles.stat}>{this.state.speciesTotal}</div>
                    <div style={styles.number}>{this.state.species}</div>
                </GridItem>
                <GridItem column="2/3" style={styles.box}>
                    <div style={styles.stat}>{this.state.perTotal}</div>
                    <div style={styles.number}>{this.state.urbanForest}</div></GridItem>
                <GridItem column="3/4" style={styles.box}>
                    <div style={styles.stat}>{this.state.familyTotal}</div>
                    <div style={styles.number}>{this.state.family}</div>
                </GridItem>
                <GridItem column="4/5" style={styles.box}>
                    <div style={styles.stat}>{this.state.familyTotal}</div>
                    <div style={styles.number}>{this.state.urbanForest}</div></GridItem>
            </Grid>
        )
    }
}

const styles = {
    container: {
        bottom: '0px',
        position: 'fixed',
        height: '20%',
        width: '70%',
        backgroundColor: 'lightgrey',
    },
    box: {
        marginTop: '3em',
        display: 'flex',
        // justifyContent: 'center',
        flexFlow: 'row wrap',
        color: '#828184',
    },
    stat: {
        fontSize: 36,
        // width: '100%',
        paddingLeft: '30%',
        paddingRight: '30%',
        justifyContent: 'center',
        textAlign: 'center',   
    },
    number: {
        fontSize: 18,
        paddingLeft: '30%',

    }
}