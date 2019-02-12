import React, { Component } from 'react';
import { Card, Table } from 'antd';
import axios from './../../axios/index';

export default class HightTable extends Component {
    state = {

    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
    }
     // 动态获取mock数据
     request = () => {
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page,
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
                    dataSource: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null
                })
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                },
                width: 80
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
                },
                width: 120
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
                },
                width: 80
            },
            {
                title: '时间',
                dataIndex: 'time',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            }
        ] 
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: 'left'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80
            },
            {
                title: '测试',
                dataIndex: 'test',
                width: 80,
                fixed: 'left'
            },
            {
                title: '测试',
                dataIndex: 'test1',
                width: 80
            },
            {
                title: '测试',
                dataIndex: 'test2',
                width: 80
            },
            {
                title: '测试',
                dataIndex: 'test3',
                width: 80
            },
            {
                title: '测试',
                dataIndex: 'test4',
                width: 80
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                },
                width: 80
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
                },
                width: 120
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
                },
                width: 80
            },
            {
                title: '时间',
                dataIndex: 'time',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            }
        ] 
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns = {columns}
                        dataSource = {this.state.dataSource}
                        pagination = {false}
                        scroll = {{y: 240}}
                    />
                </Card>
                <Card title="左侧固定">
                    <Table
                        bordered
                        columns = {columns2}
                        dataSource = {this.state.dataSource}  
                        pagination = {false}
                        scroll = {{x: 1080}}
                    />
                </Card>
            </div>
        )
    }
}
