import React, { Component } from 'react';
import { Card, Table } from 'antd';

class BasicTable extends Component{
    state ={}
    componentDidMount(){
        const dataSource = [
            {
                id: '0',
                userName: 'jack', 
                sex: '1',
                state: '1',
                hoby: '1',
                time: '2019-02-10' ,
                address: '广东省深圳市南山区 '       
            },
            {
                id: '1',
                userName: 'lesc', 
                sex: '1',
                state: '1',
                hoby: '1',
                time: '2019-02-10' ,
                address: '广东省深圳市南山区 '       
            },
            {
                id: '2',
                userName: 'rose', 
                sex: '1',
                state: '1',
                hoby: '1',
                time: '2019-02-10' ,
                address: '广东省深圳市南山区 '       
            }   
        ]
        this.setState({
            dataSource
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'state'
            },
            {
                title: '爱好',
                dataIndex: 'hoby'
            },
            {
                title: '时间',
                dataIndex: 'time'
            },
            {
                title: '地址',
                dataIndex: 'address'
            }
        ]
        return(
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}  
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
export default BasicTable