import React, { Component } from 'react';
import './NavContainer.css';
import { Button, ButtonGroup } from 'react-foundation';


export default class NavContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="navGroup">
                    <div>Heatmap</div>
                    <ButtonGroup isExpanded className="buttonGroup">
                        <Button className="button">Canopy Cover</Button>
                        <Button className="button">Height</Button>
                    </ButtonGroup>
                </div>
                <div className="navGroup">
                    <div>Filter</div>
                    <ButtonGroup isExpanded className="buttonGroup">
                        <Button className="button">CA Native</Button>
                        <Button className="button">Endangered</Button>
                        <Button className="button">Heritage</Button>
                        <Button className="button">Invasive</Button>
                    </ButtonGroup>
                </div>
                <div className="navGroup">
                    <div >Meet the Locals</div>
                    <ButtonGroup isExpanded className="buttonGroup">
                        <Button className="localsButton">One</Button>
                        <Button className="localsButton">One</Button>
                        <Button className="localsButton">One</Button>
                    </ButtonGroup>
                    <ButtonGroup isExpanded className="buttonGroup">
                        <Button className="localsButton">One</Button>
                        <Button className="localsButton">One</Button>
                        <Button className="localsButton">One</Button>
                    </ButtonGroup>
                    <ButtonGroup isExpanded className="buttonGroup">
                        <Button className="localsButton">One</Button>
                        <Button className="localsButton">One</Button>
                        <Button className="localsButton">One</Button>
                    </ButtonGroup>
                </div>
                <form className="searchBar">
                    <input type='text' name='searchNavBar' placeholder='Search all Species' className="bar" />
                </form>
            </div>
        )
    }
}