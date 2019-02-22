import React, { Component } from 'react';
import { Card, Button, Table } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';

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
    filterSubmit = (params) => {
        this.params = params;
        this.requestList()
    }
    requestList = () => {
        axios.requestList(this,'/table/list', this.params)
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
                dataIndex: "sex"
            },
            {
                title: "状态",
                dataIndex: "status"
            },
            {
                title: "爱好",
                dataIndex: "interest"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "联系地址",
                dataIndex: "address"
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
                    <Table
                        bordered
                        columns={columns}
                        rowSelection={rowCheckSelection}
                        dataSource = {this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
            </div>
        ) 
    }
}