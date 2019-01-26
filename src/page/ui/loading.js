import React, { Component } from 'react';
import { Card, Icon, Alert, Spin } from 'antd';
import './ui.less';
class Loadings extends Component{
    render() {
        const icon = <Icon type="plus" style={{fontSize:24}}></Icon>;
        const iconLoading = <Icon type="loading" style={{fontSize:24}}></Icon>;
        return(
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin />
                    <Spin size="large"/>
                    <Spin indicator={icon}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="你会React了吗？" 
                        type="info"
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="你会React了吗？" 
                            type="warning"
                        />  
                    </Spin> 
                    <Spin tip="加载中... ">
                        <Alert
                            message="React"
                            description="你会React了吗？" 
                            type="warning"
                        />  
                    </Spin> 
                    <Spin tip="加载中... " indicator={iconLoading}>
                        <Alert
                            message="React"
                            description="你会React了吗？" 
                            type="warning"
                        />  
                    </Spin> 
                </Card>
            </div>
        )
    }
}
export default Loadings