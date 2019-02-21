import React, { Component } from 'react';
import { Card, Button, Table, Select, Modal, Message, Form, DatePicker } from 'antd';
import axios from "../../axios";
import Utils from "../../utils/utils";
import './detail.less'
const { RangePicker, MonthPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
export default class   extends Component {

    state = {

    }

    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId)
        }
        this.renderMap()
    }
    getDetailInfo = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params:{
                    orderId: orderId
                }
            }
        }).then((res) => {
            if(res.code === 0) {
                this.setState({
                    orderInfo: res.result
                })
            }
        })
    }

    // 初始化地图
    renderMap = () => {
      this.map = new window.BMap.Map('orderDetailMap');
      this.map.centerAndZoom('深圳', 11);    
      this.addMapControl()
    }

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));

        let mockData = [{
            "lon": 116.361221,
            "lat": 40.043776,
            "ts": null
        },
        {
            "lon": 116.361221,
            "lat": 40.043776,
            "ts": null
        },
        {
            "lon": 116.361221,
            "lat": 40.043776,
            "ts": null
        },
        {
            "lon": 116.361221,
            "lat": 40.043776,
            "ts": null
        },
        {
            "lon": 116.361221,
            "lat": 40.043776,
            "ts": null
        },
        {
            "lon": 116.361221,
            "lat": 40.043776,
            "ts": null
        }, {
            "lon": 116.361221,
            "lat": 40.043776,
            "ts": null
        }];
        this.drawNikeRoute(mockData)
    }

    // 路线图绘制方法 
    drawNikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if(positionList.length > 0) {
            let arr = positionList[0];
            startPoint = new window.BMap.Point(arr.lon, arr.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point/png',new window.BMap.Size(36,42),{
                imageSize: new window.BMap.Size(36,42),
                anchor: new window.BMap.Size(36,42) 
            })

            let startMarker = new window.BMap.Marker(startPoint,{icon: startIcon});
        }
       
         
    }
    render() {
        const info = this.state.orderInfo || {}
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-from clearfix">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编码</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                    <div className="item-title">行驶轨迹</div>
                    <ul className="detail-from clearfix">
                        <li>
                            <div className="detail-form-left">行程起点</div>
                            <div className="detail-form-content">{info.start_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行程终点</div>
                            <div className="detail-form-content">{info.end_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行程历程</div>
                            <div className="detail-form-content">{info.distance / 1000}</div>
                        </li>
                    </ul>
                </div>
                </Card>
            </div>
        )
    }
}
