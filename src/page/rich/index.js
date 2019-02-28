import React,{ Component } from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html';
export default class Rich extends Component{
    constructor(props) {
        super(props);
        this.state = {
            editorState: '',
            showRichText: false,
            contentState: ''
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    handelClearContent = () => {
        this.setState({
            editorState: ''
        })
    }
    handelGetContent = () => {
        this.setState({
            showRichText: true
        })
    }
    onEditChange = (contentState) => {
        this.setState({
            contentState
        })
    }
    render() {
        const { editorState } = this.state;
        return(
            <div>
                <Card>
                    <Button type="primary" onClick={this.handelClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handelGetContent}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange = {this.onEditChange}
                        onEditorStateChange = { this.onEditorStateChange}
                    /> 
                </Card>
                <Modal
                    title='富文本'
                    visible={this.state.showRichText}
                    onCancel={() =>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        )
    }   
}