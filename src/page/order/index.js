import React, { Component } from 'react';
import { Card, Button, Table, Select, Modal, Message, Form, DatePicker } from 'antd';
import axios from "../../axios";
import Utils from "../../utils/utils";
const { RangePicker, MonthPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
export default class order extends Component{
    
    state = {}
    params = {
        page: 1
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                let list = res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    openOrderDeatil = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                title: '信息',
                content: '请选择订单'
            });
            return
        }
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
                    <FilterForm/>
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

class FilterForm extends Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('mode')(
                            <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
                            
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);