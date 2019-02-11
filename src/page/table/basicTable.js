import React, { Component } from 'react';
import { Card, Table, Modal } from 'antd';
import axios from './../../axios/index';
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
        dataSource.map((item,index) => {
            item.key = index;
            return item
        })
        this.setState({
            dataSource
        })
    }
    // 动态获取mock数据
    request = () => {
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1,
                    isShowLoading: true
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.list.map((item,index) => {
                    item.key = index;
                    return item;
                })
                this.setState({
                    dataSource2: res.result.list
                })
            }
        })
    }

    onRowClick = (record,index) => {
        let selectKey = [index];
        Modal.info({
            titile: '信息',
            content: `用户名：${record.userName},用户爱好: ${record.hoby}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
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
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
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
                title: '爱好',
                dataIndex: 'hoby',
                render(hoby) {
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
                    return config[hoby];
                }
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
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
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
                <Card title="动态数据渲染表格-Mock">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}  
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选">
                    <Table
                        bordered
                        rowSelection = {rowSelection}
                        onRow={(record,index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record,index)
                              },       // 点击行
                              onDoubleClick: (event) => {},
                              onContextMenu: (event) => {},
                              onMouseEnter: (event) => {},  // 鼠标移入行
                              onMouseLeave: (event) => {}
                            };
                          }}
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