import React, { Component } from 'react';
import { Card, Button, Table } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';

export default class User extends Component {
    params = {
        page: 1
    }
    state = {
        
    }
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            filed: 'user_name', 
            placeholder: '请输入用户名称',
            width: 100
        },{
            type: 'DATE',
            label: '请选择入职日期',
            filed: 'user_date', 
            placeholder: '请选择日期'
        },
        {
            type: 'INPUT',
            label: '用户手机号',
            filed: 'user_mobile', 
            placeholder: '请输入用户手机号',
            width: 100
        },
    ]
    
    componentDidMount() {
        this.requestList()
    }

    filterSubmit = (params) => {
        this.params = params;
        this.requestList()
    }
    requestList = () => {
        axios.requestList(this,'/user/list', this.params)
    }
    render() {
        const columns = [
            {
                title: "id",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "username"
            },
            {
                title: "性别",
                dataIndex: "sex",
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '百度FE',
                        '3': '前端工程师',
                        '4': '螃蟹',
                        '5': '火腿面'
                    }
                    return config[state];
                }
            },
            {
                title: "爱好",
                dataIndex: "interest",
                render(interest) {
                    let config = {
                        '1': '打游戏',
                        '2': '吃饭',
                        '3': '游泳',
                        '4': '泡澡',
                        '5': '按摩',
                        '6': '撩妹',
                        '7': '学习',
                        '8': '发呆'
                    }
                    return config[interest];
                }
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "联系地址",
                dataIndex: "address"
            },
            {
                title: "早起时间",
                dataIndex: "time"
            },
        ]
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button onClick={this.openOrderDeatil}>订单详情</Button>
                    <Button>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
        ) 
    }
}