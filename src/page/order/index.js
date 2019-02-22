import React, { Component } from 'react';
import { Card, Button, Table, Modal} from 'antd';
import axios from "../../axios";
import Utils from "../../utils/utils";
import BaseForm from '../../components/BaseForm';
export default class order extends Component{
    
    state = {}
    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            filed: 'city', 
            placeholder: '全部',
            initialValue: '1',
            list: [{id:'0', name: '全部'}, {id:'1', name: '北京'}, {id:'2', name: '天津'}, {id:'3', name: '深圳'}]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            filed: 'order_status',
            placeholder: '全部',
            initialValue: '1',
            list: [{id:'0', name: '全部'}, {id:'1', name: '进行中'}, {id:'2', name: '结束行程'}]
        }
    ]

    componentDidMount() {
        this.requestList()
    }

    // 接受BaseForm 传递过来的数据
    handelFilter = (params) => {
        this.params = params;
        this.requestList()
    }

    requestList = () => {
        axios.requestList(this, '/order/list', this.params)
    }

    openOrderDeatil = () => {
        let item = this.state.selectedItem;
        console.log(item)
        if(!item) {
            Modal.info({
                title: '信息',
                content: '请选择订单'
            });
            return
        }
        // this.props.history.push(`common/order/detail/1`)
        window.open(`/#/common/order/detail/${item[0].id}`, '_blank');
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        console.log(selectKey,record)
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
 
    render() {
        const columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn"
            },
            {
                title: "车辆编号",
                dataIndex: "bike_sn"
            },
            {
                title: "用户名",
                dataIndex: "user_name"
            },
            {
                title: "手机号",
                dataIndex: "mobile"
            },
            {
                title: "里程",
                dataIndex: "distance"
            },
            {
                title: "行驶时长",
                dataIndex: "total_time"
            },
            {
                title: "状态",
                dataIndex: "status",
                render(mode){
                    return mode === 1 ?'进行中':'结束进程';
                }
            },
            {
                title: "开始时间",
                dataIndex: "start_time"
            },
            {
                title: "结束时间",
                dataIndex: "end_time"
            },
            {
                title: "订单金额",
                dataIndex: "total_fee"
            },
            {
                title: "实付金额",
                dataIndex: "user_pay"
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys,selectedRows)
                this.setState({
                    selectedRowKeys,
                    selectedItem: selectedRows
                })
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList = {this.formList} filterSubmit={this.handelFilter}/>
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
