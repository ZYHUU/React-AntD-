import React, { Component } from 'react';
import {Card, Form} from 'antd';
import axios from '../../axios';
import BaseForm from '../../components/BaseForm';
export default class BikeMap extends Component {
    formList = [
        {
            type: '城市'
        },{
            type: '时间查询'
        },{
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'},{id: '2', name: '行程结束'}]
        }
    ]

    handelfilterSubmit = (filterParams) => {
        this.params = filterParams;
    }

    render() {
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelfilterSubmit}/>
                </Card>
            </div>
        )
    }
}