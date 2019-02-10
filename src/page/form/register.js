import React, { Component } from 'react';
import { Card, Form, Button, Input, Switch, Radio, InputNumber,Select, Checkbox, DatePicker, TimePicker, Upload, Icon } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const TextArea = Input.TextArea;

class FormRegister extends Component{
    state={}
    handelSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
      }
    render() {
        const { getFieldDecorator } = this.props.form;  
        const formItemLayout = {
            labelCol: {
                xs:24,
                sm:4 
            },
            wrapperCol: {
               xs:24,
               sm:10 
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return(
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: 'jacks',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ] 
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }                          
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        }
                                    ] 
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }                          
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue: '1',
                                    rules: [
                                        {
                                            required: true,
                                            message: '行别不能为空'
                                        }
                                    ] 
                                })(
                                   <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                   </RadioGroup>
                                )
                            }                          
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue: 18,
                                })(
                                   <InputNumber />
                                )
                            }                          
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue: '1',
                                })(
                                   <Select>
                                        <Option value="1">百度FE</Option>
                                        <Option value="2">Boss</Option>
                                        <Option value="3">咸鱼一条</Option>
                                   </Select>
                                )
                            }                          
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue: ['1','2'],
                                })(
                                   <Select mode="multiple">
                                        <Option value="1">刺激战场</Option>
                                        <Option value="2">王者荣耀</Option>
                                        <Option value="3">英雄联盟</Option>
                                   </Select>
                                )
                            }                          
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried',{
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                   <Switch />
                                )
                            }                          
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue: moment('2019-02-10 13:40:34'),
                                })(
                                    <DatePicker 
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />  
                                )
                            }                          
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue: '广东省深圳市南山区'
                                })(
                                    <TextArea
                                        autosize={
                                            {
                                                minRows: 4,
                                                maxRows: 6
                                            }
                                        }
                                    />
                                )
                            }                          
                        </FormItem>
                        <FormItem label="上班时间" {...formItemLayout}>
                            {
                                getFieldDecorator('workTime')(
                                    <TimePicker/>
                                )
                            }                          
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload 
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                    >
                                    {this.state.userImg?<img src={this.state.userImg} alt=""/>:<Icon type="plus"/>}
                                    </Upload>
                                )
                            }                          
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            {
                                getFieldDecorator('userHttp',{
                                    valuePropName: 'checked',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请阅读并遵守该协议'
                                        }
                                    ]    
                                })(
                                    <Checkbox>我已阅读过<a href="/">网站协议</a></Checkbox>
                                )
                            }                          
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            {
                                getFieldDecorator('userSubmit')(
                                    <Button type="primary" onClick={this.handelSubmit}>注册</Button>
                                )
                            }                          
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormRegister);