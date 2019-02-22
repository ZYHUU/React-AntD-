import React, { Component } from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd';
import utils from '../../utils/utils';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {

    handelFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = () => {
        this.props.form.resetFields()
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item,i) => {
                let label = item.label;
                let filed = item.filed;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} key={filed}>
                    {   
                        getFieldDecorator([filed],{
                            initialValue: initialValue
                        })(
                            <Input type="text" placeholder={placeholder} />
                        )
                    }
                    </FormItem>
                    formItemList.push(INPUT)
                } else if (item.type === "DATE") {
                    const Date = <FormItem label={label} key={filed}>
                    {
                        getFieldDecorator([filed], {
                            initialValue: initialValue
                        })(
                            <DatePicker placeholder = {placeholder}/>
                        )
                    }
                    </FormItem>
                    formItemList.push(Date)
                } else if (item.type === "时间查询") {
                    const begin_time = <FormItem label='订单时间' key={filed}>
                    {
                        getFieldDecorator('begin_time', {
                            initialValue: initialValue
                        })(
                            <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
                        )
                    }
                    </FormItem>
                    formItemList.push(begin_time)
                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} key={filed}>
                    {   
                        getFieldDecorator([filed],{
                            initialValue: initialValue
                        })(
                            <Select
                                style={{width:width}}
                                placeholder={placeholder}
                            >
                            { utils.getOptionList(item.list) }
                            </Select>
                        )
                    }
                    </FormItem>
                    formItemList.push(SELECT)
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={filed}>
                    {   
                        getFieldDecorator([filed],{
                            valueProName: 'checked',
                            initialValue: initialValue
                        })(
                            <Checkbox>
                                {label}
                            </Checkbox>
                        )
                    }
                    </FormItem>
                    formItemList.push(CHECKBOX)
                }
            })
        }
        return formItemList
    }
    render() {
        return(
            <Form layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handelFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default FilterForm = Form.create({})(FilterForm);