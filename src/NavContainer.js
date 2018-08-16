import React, { Component } from 'react';
import { Grid, GridItem } from 'styled-grid-component';
import './container.css';
import { Button } from 'react-bootstrap';


export default class NavContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Grid
                style={styles.container}
                width="28%"
                templateColumns="repeat(9, 1fr)"
                gap=".5em"
                autoRows="minmax(5em)"
            >
                <GridItem column="1/10" row="1" style={{ paddingBottom: '1em' }}>
                    Heatmap
                    <div style={styles.buttonDiv}>
                        <Button style={styles.button}>Canopy Cover</Button>
                        <Button style={styles.button}>Height</Button>
                    </div>
                </GridItem>
                <GridItem column="1/10" row="2" style={{ paddingBottom: '1em' }}>
                    Filter
                <div style={styles.buttonDiv}>
                        <Button style={styles.button}>CA Native</Button>
                        <Button style={styles.button}>Endangered</Button>
                        <Button style={styles.button}>Heritage</Button>
                        <Button style={styles.button}>Invasive</Button>
                    </div>
                </GridItem>
                <GridItem column="1/4" row="3" style={{ height: '1.2em' }}>Meet the Locals</GridItem>
                <GridItem column="1/4" row="4" style={styles.localsButton}>Six</GridItem>
                <GridItem column="4/7" row="4" style={styles.localsButton}>Seven</GridItem>
                <GridItem column="7/10" row="4" style={styles.localsButton}>Eight</GridItem>
                <GridItem column="1/4" row="5" style={styles.localsButton}>Three</GridItem>
                <GridItem column="4/7" row="5" style={styles.localsButton}>Four</GridItem>
                <GridItem column="7/10" row="5" style={styles.localsButton}>Five</GridItem>
                <GridItem column="1/4" row="6" style={styles.localsButton}>Three</GridItem>
                <GridItem column="4/7" row="6" style={styles.localsButton}>Four</GridItem>
                <GridItem column="7/10" row="6" style={styles.localsButton}>Five</GridItem>
                <GridItem column="1/10" row="7">
                <form>
                    <input type='text' name='searchNavBar' placeholder='Search all Species' style={styles.searchBar}/>
                </form>
                </GridItem>
            </Grid>
        )
    }
}
const styles = {
    container: {
        backgroundColor: '#f0f0f0',
        textAlign: 'left',
        padding: '1em',
        float: 'right',
        position: 'fixed',
    },
    button: {
        fontSize: 9,
        height: '3em',
        width: '9em',
        borderRadius: 3,
        float: 'left',
        backgroundColor: '#d9d9d9',
    },
    buttonDiv: {
        padding: '.5em',
    },
    localsButton: {
        height: '4em',
        paddingTop: '40%',
        textAlign: 'center',
        borderRadius: 3,
        borderWidth: '.1em',
        borderColor: 'grey',
        borderStyle: 'solid',
        backgroundColor: '#d9d9d9',
    },
    searchBar: {
        height: '2em',
        width: '95%',
        paddingLeft: '1em'
    }
}