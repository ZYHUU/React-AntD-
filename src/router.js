import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './app';
import Login from './page/login';
import Admin from './admin';
import Home from './page/home'
import Buttons from './page/ui/buttons';
import Modals from './page/ui/modals';
import Loadings from './page/ui/loading'
import Notice from './page/ui/notice'
import Message from './page/ui/message'
import Tabs from './page/ui/tabs';
import Gallery from './page/ui/gallery';
import Carousels from './page/ui/carousel';
import FormLogin from './page/form/login';

import NoMatch from './page/nomatch/index';
class IRouter extends Component{
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/ui/buttons" component={Buttons}/>
                                <Route path="/ui/modals" component={Modals}/>
                                <Route path="/ui/loadings" component={Loadings}/>
                                <Route path="/ui/notification" component={Notice}/>
                                <Route path="/ui/tabs" component={Tabs}/>
                                <Route path="/ui/gallery" component={Gallery}/>
                                <Route path="/ui/carousel" component={Carousels}/>
                                <Route path="/form/login" component={FormLogin}/>
                                <Route path="/ui/messages" component={Message}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                
                    }/>
                </App>
            
            </HashRouter>
        )
    }
}
export default IRouter