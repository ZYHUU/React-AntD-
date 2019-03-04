import React, { Component } from "react";
import { Card, Button, Modal } from "antd";
import "./ui.less";
class Modals extends Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  };
  handleOpen = type => {
    this.setState({
      [type]: true
    });
  };
  handleOpenConfirm = type => {
    Modal[type]({
      title: "确认?",
      content: "你确定这是React吗？",
      onOk() {
        console.log("ok");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  render() {
    return (
      <div>
        <Card title="基础模态框" className="card-wrap">
          <Button type="primary" onClick={() => this.handleOpen("showModal1")}>
            open
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal2")}>
            自定义页脚
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal3")}>
            top 20 padding
          </Button>
          <Button type="primary" onClick={() => this.handleOpen("showModal4")}>
            水平垂直居中
          </Button>
        </Card>
        <Card title="信息确认框" className="card-wrap">
          <Button
            type="primary"
            onClick={() => this.handleOpenConfirm("confirm")}
          >
            Confirm
          </Button>
          <Button type="primary" onClick={() => this.handleOpenConfirm("info")}>
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenConfirm("success")}
          >
            success
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenConfirm("warning")}
          >
            warning
          </Button>
        </Card>
        <Modal
          title="React"
          visible={this.state.showModal1}
          onCancel={() => {
            this.setState({
              showModal1: false
            });
          }}
        >
          <p>React Modal</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal2}
          okText="下一步"
          cancelText="去活"
          onCancel={() => {
            this.setState({
              showModal2: false
            });
          }}
        >
          <p>React Modal</p>
        </Modal>
        <Modal
          title="React"
          style={{ top: 20 }}
          visible={this.state.showModal3}
          onCancel={() => {
            this.setState({
              showModal3: false
            });
          }}
        >
          <p>React Modal</p>
        </Modal>
        <Modal
          title="React"
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4}
          onCancel={() => {
            this.setState({
              showModal4: false
            });
          }}
        >
          <p>React Modal</p>
        </Modal>
      </div>
    );
  }
}
export default Modals;
