import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './app';
import Login from './page/login';
import Admin from './admin';
import Buttons from './page/ui/buttons';
class IRouter extends Component{
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons}></Route>
                            </Switch>
                        </Admin>
                
                    }/>
                </App>
            
            </HashRouter>
        )
    }
}