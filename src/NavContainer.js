import React, { Component } from 'react';
import { Grid, GridItem } from 'styled-grid-component';
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
                width="30%"
                templateColumns="repeat(9, 1fr)"
                autoRows="minmax(5em)"
                height="auto"
            >
                <GridItem column="1/10" row="1" style={{ padding: '1em' }}>
                    Heatmap
                    <div style={styles.buttonDiv}>
                        <Button style={styles.button}>Canopy Cover</Button>
                        <Button style={styles.button}>Height</Button>
                    </div>
                </GridItem>
                <GridItem column="1/10" row="2" style={{ padding: '1em' }}>
                    Filter
                <div style={styles.buttonDiv}>
                        <Button style={styles.button}>CA Native</Button>
                        <Button style={styles.button}>Endangered</Button>
                        <Button style={styles.button}>Heritage</Button>
                        <Button style={styles.button}>Invasive</Button>
                    </div>
                </GridItem>
                <GridItem column="1/10" row="3" style={{ width: '10em', paddingLeft: '1em'}}>Meet the Locals</GridItem>
                <div>
                    <Grid style={styles.locals}
                        width="30%"
                        templateColumns="repeat(9, 1fr)"
                        autoRows="minmax(7em)"
                    >
                        <GridItem column="1/4" row="1" style={styles.localsButton}>One</GridItem>
                        <GridItem column="4/7" row="1" style={styles.localsButton}>Two</GridItem>
                        <GridItem column="7/10" row="1" style={styles.localsButton}>Three</GridItem>
                        <GridItem column="1/4" row="2" style={styles.localsButton}>Four</GridItem>
                        <GridItem column="4/7" row="2" style={styles.localsButton}>Five</GridItem>
                        <GridItem column="7/10" row="2" style={styles.localsButton}>Six</GridItem>
                        <GridItem column="1/4" row="3" style={styles.localsButton}>Seven</GridItem>
                        <GridItem column="4/7" row="3" style={styles.localsButton}>Eight</GridItem>
                        <GridItem column="7/10" row="3" style={styles.localsButton}>Nine</GridItem>
                        <GridItem column="1/10" row="4">
                            <form>
                                <input type='text' name='searchNavBar' placeholder='Search all Species' style={styles.searchBar} />
                            </form>
                        </GridItem>
                    </Grid>
                </div>
            </Grid>
        )
    }
}
const styles = {
    container: {
        backgroundColor: '#f0f0f0',
        textAlign: 'left',
        right: '0px',
        position: 'fixed',
    },
    locals: {
        backgroundColor: '#f0f0f0',
        position: 'fixed',
    },
    button: {
        fontSize: 9,
        height: '3em',
        margin: '.2em',
        borderRadius: 3,
        float: 'left',
        backgroundColor: '#d9d9d9',
        color: '#828184',
    },
    localsButton: {
        margin: '.5em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '8em',
        color: '#828184',
        borderRadius: 3,
        borderWidth: '.1em',
        borderColor: 'grey',
        borderStyle: 'solid',
        backgroundColor: '#d9d9d9',
    },
    searchBar: {
        height: '2em',
        width: '95%',
        marginLeft: '1em'
    }
}