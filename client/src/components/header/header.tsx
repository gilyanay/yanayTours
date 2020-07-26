import React, { Component } from "react";
import "./header.css"
import { store } from '../../redux/store';
import { ActionType } from "../../redux/action-type";
import {  Navbar, Nav,  } from 'react-bootstrap';



export default class Header extends Component<any>{

    constructor(prop: any) {
        super(prop)

        store.subscribe(() => this.setState(
            {
                isLogedIn: store.getState().isLogedIn,


            })
        );
    }

    private logOut = () => {

        store.dispatch({ type: ActionType.onLogIn, payload: false });
    }



    public render() {
        return (
            <div className="header">


                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Navbar.Brand >
                    <img
        src={require("D:/קורס תכנות גון ברייס/project_4_react_yanayTours/client/src/assets/logo2.png")}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt=""
      />
                        Yanay-Tours</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                    
                         
                        </Nav>
                        <Nav>
                        <Nav.Link href="home"  hidden={store.getState().isLogedIn}>home</Nav.Link>
                            <Nav.Link href="vacations" hidden={!store.getState().isLogedIn}>all vacations</Nav.Link>
                            <Nav.Link href="followVacations" hidden={!store.getState().isLogedIn}>my vacations</Nav.Link>
                            <Nav.Link href="aboutUs">about us</Nav.Link>
                            <Nav.Link href="theTeam">the team</Nav.Link>
                            <Nav.Link  href="home" hidden={!store.getState().isLogedIn} onClick={this.logOut}>log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {/* <NavLink  hidden={store.getState().isLogedIn} to="/home" exact>home</NavLink>
                <NavLink  hidden={!store.getState().isLogedIn} to="/vacations" exact>all vacations</NavLink>
                <NavLink  hidden={!store.getState().isLogedIn} to="/vacations" exact>my vacations</NavLink>
                <NavLink to="/aboutUs" exact>about us</NavLink>
                <NavLink to="/theTeam" exact>the team</NavLink>
                <NavLink  hidden={!store.getState().isLogedIn} onClick={this.logOut} to="/home" exact> log out</NavLink> */}


            </div>
        )
    }
}