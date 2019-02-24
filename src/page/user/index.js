import React, { Component } from 'react';
import { Card, Button, Table, Modal, Form, Radio, DatePicker, Select, Input } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';
import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
export default class User extends Component {
    params = {
        page: 1
    }
    state = {
        isVisible: false
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

    // 操作区 增，删，改，查
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        console.log(item)
        if (type === 'create') {
            this.setState({
                type,
                isVisible: true,
                userInfo: {}
            })
        } else if (type === 'edit') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item
            })
        } else if (type === 'detail') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            })
        } else {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择用户'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除该员工',
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code === 0) {
                            _this.setState({
                                isVisible: false
                            })
                            _this.requestList()
                        }
                    })
                }
            })
        }
    }

    // 选择表格某条数据
    onRowClick = (record,index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    // 创建员工提交
    handelSubmit = () => {
        let type = this.state.type;
        // antd 收集表单数据
        let data = this.UserForm.props.form.getFieldsValue();
        axios.ajax({
            url: type=='create'? '/user/add' : 'user/edit',
            data: {
                params: data
            }
        }).then(res => {
            if (res.code === 0) {
                // antd重置表单
                this.UserForm.props.form.resetFields();
                this.setState({
                    isVisible: false
                })
                this.requestList();
            }
        })
    }
    render() {
        const { selectedRowKeys } = this.state;
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
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        let footer = {};
        if (this.state.type === 'detail') {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelFilter}/>
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button icon="delete" onClick={() =>this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    {/*<ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        selectedItem={this.state.selectedItem}
                        rowSelection="radio"
                    />*/}
                    <Table
                        bordered
                        rowSelection = {rowSelection}
                        onRow={(record,index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record,index)
                              }
                            };
                          }}
                        columns={columns}
                        dataSource={this.state.list}  
                        pagination={false}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handelSubmit}
                    onCancel={() => {
                        this.UserForm.props.form.resetFields()
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst) => { this.UserForm = inst }}></UserForm>
                </Modal>    
            </div>
        ) 
    }
}

class UserForm extends Component{

    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '百度FE',
            '3': '前端工程师',
            '4': '螃蟹',
            '5': '火腿面'
        }[state]
    }
    render() {
        let type = this.props.type || {};
        let userInfo = this.props.userInfo;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span : 16}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {   
                        type === 'detail' ? userInfo.username :
                        getFieldDecorator('username', {
                            initialValue: userInfo.username
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                        
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type === 'detail' ? (userInfo.sex === 1 ? '男' : '女') :
                        getFieldDecorator('sex', {
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>           
                        )                      
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    { 
                        type === 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state', {
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>百度FE</Option>
                                <Option value={3}>前端工程师</Option>
                                <Option value={4}>螃蟹</Option>
                                <Option value={5}>火腿面</Option>
                            </Select>        
                        )                      
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday', {
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker/>
                        )                      
                    }
                </FormItem>
                <FormItem label="地址" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.address :
                        getFieldDecorator('address', {
                            initialValue: userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址"></TextArea>
                        )                      
                    }
                </FormItem>
            </Form>
        )
    }
}

UserForm = Form.create({})(UserForm)