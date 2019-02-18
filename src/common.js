import React from 'react';
import { Row } from 'antd';
import Header from './components/Header';
import './style/components.less';


export default class Common extends React.Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second"/>
                </Row>
                <Row className="content">
                    qqq
                {console.log(this.props.children)}
                    {this.props.children}
                </Row>
            </div>
           
        )
    }
} 