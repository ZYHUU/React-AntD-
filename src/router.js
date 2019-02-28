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
import FormRegister from './page/form/register';
import BasicTable from './page/table/basicTable';
import HightTable from './page/table/highTable';
import City from './page/city';
import Order from './page/order';
import User from './page/user';

import Common from './common'
import Orderdetail from './page/order/detail.js'
import BikeMap from './page/map/bikeMap.js'
import Bar from './page/echarts/bar/index'
import Pie from './page/echarts/pie/index'
import Line from './page/echarts/line/index'
import Rich from './page/rich'
import Permission from './page/permission'

import NoMatch from './page/nomatch/index';
class IRouter extends Component{
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common" render={() => 
                            <Common>
                                <Switch>
                                    <Route path="/common/order/detail/:orderId" component={Orderdetail}/>
                                </Switch>                               
                            </Common>
                        }
                        />
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
                                    <Route path="/ui/messages" component={Message}/>
                                    <Route path="/form/login" component={FormLogin}/>
                                    <Route path="/form/reg" component={FormRegister}/>
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HightTable} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order}/>   
                                    <Route path="/user" component={User}/>     
                                    <Route path="/bikeMap" component={BikeMap} />              
                                    <Route path="/charts/bar" component={Bar} />  
                                    <Route path="/charts/pie" component={Pie}/>
                                    <Route path="/charts/line" component={Line}/>
                                    <Route path="/rich" component={Rich} />
                                    <Route path="/permission" component={Permission}/>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                            
                        } />

                    </Switch>                    
                    
                </App>
            
            </HashRouter>
        )
    }
}
export default IRouter