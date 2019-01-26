import React, { Component } from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less';
class Notice extends Component{
    openNotification = (type,direction) => {
        notification[type]({
            message: '工资到账通知',
            description: '上个月考勤8天，实发工资6888941.32，请笑纳',
            placement: direction
        });
    }
    render() {
        return(
            <div>
                <Card title="通知提醒框" className="card-wrap">
                  <Button type="primary" onClick={() =>this.openNotification('success', 'topLeft')}>success-topLeft</Button>
                  <Button type="primary" onClick={() =>this.openNotification('info', 'topRight')}>info-topRight</Button>
                  <Button type="primary" onClick={() =>this.openNotification('warning', 'bottomLeft')}>warning-bottomLeft</Button>
                  <Button type="primary" onClick={() =>this.openNotification('error', 'BottomRight')}>error-BottomRight</Button>
                </Card>
            </div>
        )
    }
}
export default Notice