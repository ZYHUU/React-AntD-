import React, { Component } from 'react';
import { Card } from 'antd';
// 主题
import echartTheme from './../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component{

    componentWillMount() {
        // 注入主题 render 之前注入
        echarts.registerTheme("Imooc", echartTheme);
    }

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    data: [1000,2000,600,1500,900,2500,1700]
                }
            ]
        }
        return option
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data: ['OFO','膜拜','哈罗']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [1000,2000,3000,4000,5000,6000,7000]
                },
                {
                    name: '膜拜',
                    type: 'bar',
                    data: [2000,4000,6000,8000,10000,12000,14000]
                },
                {
                    name: '哈罗',
                    type: 'bar',
                    data: [2000,4000,6000,8000,6000,4000,2000]
                }
            ]
        }
        return option
    }

    render() {
        return (
            <div>
                <Card title="柱形图表一">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{height: 400}}/>
                </Card>
                <Card title="柱形图表二">
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height: 400}}/>
                </Card>
            </div>
        )
    }
}