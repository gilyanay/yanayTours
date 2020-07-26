import React, { Component } from "react";
import Header from "../header/header";

import Login from "../login/login";
import "./layout.css"
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Vacations from "../vacations/vacations";
import axios from "axios";
import Register from "../register/register";
import { store } from '../../redux/store';


// const token= store.getState().token


// axios.defaults.headers.common = {
//     'Authorization': 'Bearer ' + token
// };


export default class Layout extends Component {



    public render() {
        return (
            <BrowserRouter>
                <section className="layout">
                    <header>
                        <Header />

                    </header>


                    <main>

                        <Switch>
                            <Route path="/home" component={Login} exact />
                            <Route path="/vacations" component={Vacations} exact />
                            <Route path="/register" component={Register} exact />
                            <Redirect from="/" to="/home" exact />

                        </Switch>

                    </main>
                

 
                


                </section>
            </BrowserRouter>
        )
    }
}