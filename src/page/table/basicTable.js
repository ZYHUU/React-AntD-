import React, { Component } from 'react';
import { Card, Table } from 'antd';
import axios from 'axios';
class BasicTable extends Component{
    state ={
        dataSource2: []
    }
    componentDidMount(){
        this.request()
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
    // 动态获取mock数据
    request = () => {
        let baseUrl = 'https://www.easy-mock.com/mock/5c6008e24bed3a634271147a/mockapi'
        axios.get(baseUrl + '/table/list').then((res) => {
            console.log(res)
            if(res.status === 200 && res.data.code === 0){
                this.setState({
                    dataSource2: res.data.result.list
                })
            }
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
                <Card title="动态数据渲染表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}  
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
export default BasicTable