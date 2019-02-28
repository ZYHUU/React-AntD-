import React,{ Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, Input } from 'antd';
import Utils from './../../utils/utils';
import axios from './../../axios'
const FormItem = Form.Item;
const Option = Select.Option;
export default class PermissionUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: '',
            list: ''
        }
    }

    componentWillMount() {
        this.requestList()
    }

    requestList = () => {
        axios.requestList(this, '/role/list', {});
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        console.log(selectKey,record)
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    // 打开创建角色弹框
    handelRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    // 角色提交
    handelRoleSubmit = () => {
        let data = this.RoleForm.props.form.getFieldsValue();
        axios.ajax({
            url: 'role/create',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    isRoleVisible: false
                })
                this.RoleForm.props.form.resetFields();
                this.requestList()
            }
        })
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            },
            {
                title: '角色名称',
                dataIndex: 'role_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formateDate
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    return status === 1 ? '启用' : '停用'
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formateDate
                
            },
            { 
                title: '授权人',
                dataIndex: 'authorize_user_name'
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
        return(
            <div>
              <Card>
                    <Button type="primary" onClick={this.handelRole} >创建角色</Button>
                </Card>
                <div>
                    <Table
                        columns={columns}
                        dataSource={this.state.list}
                        rowSelection={rowCheckSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handelRoleSubmit}
                    onCancel={() => {
                        this.RoleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.RoleForm = inst}></RoleForm>
                </Modal>
            </div>
        )
    }   
}

class RoleForm extends Component{

    getState = (state) => {
        return {
            '1': '开启',
            '2': '关闭'
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
                <FormItem label="角色名称" {...formItemLayout}>
                    {   
                        type === 'detail' ? userInfo.username :
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                        
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    { 
                        type === 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('status')(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>        
                        )                      
                    }
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create({})(RoleForm)