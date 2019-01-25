import React, { Component } from  'react';
import  { HashRouter as Router, Route } from 'react-router-dom';
import Main from '../route1/Main';
import About from '../route1/About';
import Topics from '../route1/topics';
import Home from './Home'
class IRouter extends Component{
    render() {
        return(
            <Router>
                <Home>
                    <Route  path="/main" render={()=>(
                        <Main>
                            <Route exact={true} path="/main/a" component={About}></Route>
                        </Main>
                    )}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topics}></Route>                  
                </Home>
            </Router>
        )
    }
}

export default IRouter
