import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import './style/components.less';


export default class Common extends Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second"/>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>    
            </div>
           
        )
    }
} 