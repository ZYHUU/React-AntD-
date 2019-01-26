import React, { Component } from 'react';
import { Card, Tabs, message,  Icon } from 'antd';
import './ui.less';
const TabPane = Tabs.TabPane;
class Tab extends Component{
    callBack = (key) => {
        message.info("您选择了页签  " + key)
    }
    onChange =(activeKey) => {
        this.setState({
            activeKey
        })
    }
    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Tab 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ];
        this.setState({
            panes,
            activeKey: panes[0].key
        })
    }
    render() {
        return(
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callBack}>
                        <TabPane tab="Tab 1" key="1">React</TabPane>
                        <TabPane tab="Tab 2" key="2">Vue</TabPane>
                        <TabPane tab="Tab 3" key="3">Angular</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callBack}>
                        <TabPane tab={<span><Icon type="plus">Tab 1</Icon></span>} key="1">React</TabPane>
                        <TabPane tab={<span><Icon type="edit">Tab 2</Icon></span>} key="2">Vue</TabPane>
                        <TabPane tab={<span><Icon type="delete">Tab 3</Icon></span>} key="3">Angular</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab可编辑页签" className="card-wrap">
                    <Tabs 
                        activeKey={this.state.activeKey} 
                        type="editable-card"
                        onChange={this.onChange}>
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}
                                >{panel.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
export default Tab