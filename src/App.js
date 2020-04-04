
import React, { Component } from 'react';
import '@vkontakte/vkui/dist/vkui.css'
import Main from "./components/Main";
import Hello from "./components/Hello";
import {Router, Route, Switch, withRouter, Redirect} from "react-router-dom";
import Cookie from "./cookie/Cookie";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        let untilDateStr = Cookie.getUntilDate();
        if(typeof untilDateStr !== "undefined")
        {
            let now = new Date();
            let untilDate = new Date(parseInt(untilDateStr));
            if(now > untilDate)
            {
                let activities = Cookie.getCurrentActivities();
                Cookie.removeActivities();
                Cookie.removeDate();
                Cookie.addToStats(activities, untilDateStr);
            }
        }


        let routes = (
            <Switch>
                <Route history={history} exact path='/main'>
                    <Main/>
                </Route>
                <Route history={history} path='/hello' >
                    <Hello/>
                </Route>
                <Redirect to="/main"/>

            </Switch>
        );
        if(!Cookie.isAuth())
            routes = (
                <Switch>
                    <Route history={history} exact path='/main'>
                        <Main/>
                    </Route>
                    <Route history={history} path='/hello' >
                        <Hello/>
                    </Route>
                    <Redirect to="/hello"/>
                </Switch>
            );


        return routes;
    }
}

export default withRouter(App);