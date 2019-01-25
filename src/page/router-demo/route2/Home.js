import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';

class Home extends Component{
    render() {
        return(
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/main">Home1</Link>
                        </li>
                        <li>
                            <Link to="/about">About1</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics1</Link>
                        </li>
                    </ul>
                    <hr/>
                    {this.props.children}
                </div>
            </HashRouter>
        )
    }
}
export default Home