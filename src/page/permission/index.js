import React,{ Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, Input, Tree } from 'antd';
import Utils from './../../utils/utils';
import axios from './../../axios';
import data from './../../config/menuConfig';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class PermissionUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: '',
            list: '',
            isPermissionVisible: false,
            isRoleVisible: false
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

    // 权限设置
    handelPermission = () => {
        let item = this.state.selectedItem;
        console.log(item)
        if (!item) {
            Modal.info({
                content:'请选择一个角色'
            })
        } else {
            this.setState({
                isPermissionVisible: true,
                detailInfo: item,
                menuInfo: item.menus
            })
        }
    }

    // 提交
    handelkPermEditSubmit = () => {
        let datas = this.permForm.props.form.getFieldsValue();
        datas.role_id = this.state.selectedItem.id;
        datas.menuInfo = this.state.menuInfo;
        axios.ajax({
            url: '/permission/edit',
            data: {
                params:{...datas}
            }
        }).then((res) => {
            if(res) {
                this.setState({
                    isPermissionVisible: false
                })
            }
            this.requestList();
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
                console.log(selectedRows)
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
                    <Button type="primary" style={{marginLeft:'10px', marginRight:'10px'}} onClick={this.handelPermission} >设置权限</Button>
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
                <Modal
                    title="设置权限"
                    visible={this.state.isPermissionVisible}
                    width={600}
                    onOk={this.handelkPermEditSubmit}
                    onCancel = {() => {
                        this.setState({
                            isPermissionVisible: false
                        })
                    }}
                >
                    <PermEditForm
                       wrappedComponentRef={(inst) => this.permForm = inst}
                       detailInfo={this.state.detailInfo} 
                       menuInfo={this.state.menuInfo}
                       patchMenuInfo={(checkedKeys) => {
                           this.setState({
                                menuInfo: checkedKeys
                           })                         
                       }}
                    />
                </Modal>
            </div>
        )
    }   
}

// 创建角色表单
class RoleForm extends Component{

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
                        getFieldDecorator('state',{
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>        
                        )                      
                    }
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create({})(RoleForm)


// 设置权限表单
class PermEditForm extends Component{

    // 递归渲染TreeNOde
    renderTreeNodes = (data) => {
       return data.map((item) => {
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode {...item} />
            }
        })
    }

    onCheck = (checkedKeys,info) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span : 16}
        }
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name}/>
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue: 1      
                        })(
                            <Select>
                                <Option value={1}>启用</Option>
                                <Option value={0}>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys,info) =>{
                        this.onCheck(checkedKeys,info)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(data)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

PermEditForm = Form.create({})(PermEditForm)