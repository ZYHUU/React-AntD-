import React, { Component } from 'react';
import { Card, Button, Table, Select, Modal, Message, Form, DatePicker } from 'antd';
import axios from "../../axios";
import Utils from "../../utils/utils";
import './detail.less'
const { RangePicker, MonthPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
export default class Detail extends Component {
    render() {
        return (
            <div>
                <Card>
                    <div id="orderDetailMap"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-from">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编码</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content"></div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content"></div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}