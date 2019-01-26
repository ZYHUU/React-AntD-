import React, { Component } from 'react';
import { Card, Button, message  } from 'antd';
import './ui.less';
class Message extends Component{
    showMessage = (type,direction) => {
        message[type]('React学完了吗?');
    }
    render() {
        return(
            <div>
                <Card title="全局提示框" className="card-wrap">
                  <Button type="primary" onClick={() =>this.showMessage('success', 'topLeft')}>success</Button>
                  <Button type="primary" onClick={() =>this.showMessage('info', 'topRight')}>info</Button>
                  <Button type="primary" onClick={() =>this.showMessage('warning', 'bottomLeft')}>warning</Button>
                  <Button type="primary" onClick={() =>this.showMessage('error', 'BottomRight')}>error</Button>
                </Card>
            </div>
        )
    }
}
export default Message