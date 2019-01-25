import React from 'react';
import { Row, Col } from 'antd';
import NavLeft from './components/NavLeft'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/home';
import './style/components.less';


export default class Admin extends React.Component {
    render() {
        return(
           <Row className="container">
                <Col span={4} className="nav-left">
                <NavLeft/>
                </Col>
                <Col span={20} className="main">
                  <Header />
                  <Row className="content">
                    <Home/>
                  </Row>
                  <Footer />
                </Col>
           </Row>
        )
    }
} 