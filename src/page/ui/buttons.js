import React, { Component } from 'react';
import { Card, Button, Radio } from 'antd';
import './ui.less';
class Buttons extends Component{
    state = {
        loading: true,
        content: '关闭'
    }
    handleCloseLoading() {
        this.setState({
            loading: !this.state.loading,
            content: this.state.loading ? '开启' : '关闭'
        })
    }
    handelChange(e) {
        this.setState({
            size: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Card title="基础按钮"  className="card-warp">
                    <Button type="primary">primary</Button>
                    <Button >基础按钮</Button>
                    <Button type="dashed">dashed</Button>
                    <Button type="danger">danger</Button>
                    <Button disabled>disabled</Button>
                </Card>
                <Card title="图形按钮"  className="card-warp">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-warp">
                    <Button type="primary" loading={ this.state.loading }>确定</Button>
                    <Button type="primary" shape="circle" loading={ this.state.loading }></Button>
                    <Button loading={ this.state.loading }>点击加载</Button>
                    <Button shape="circle" loading={ this.state.loading }></Button>
                    <Button type="primary" onClick={ this.handleCloseLoading.bind(this)}>{ this.state.content }</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-warp">
                    <Radio.Group value={this.state.size} onChange={ this.handelChange.bind(this)}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={ this.state.size }>primary</Button>
                    <Button size={ this.state.size }>基础按钮</Button>
                    <Button type="dashed" size={ this.state.size }>dashed</Button>
                    <Button type="danger" size={ this.state.size }>danger</Button>       
                </Card>
            </div>
        )
    }
}
export default Buttons