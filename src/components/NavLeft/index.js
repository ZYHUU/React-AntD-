import React, { Component } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { switchMenu } from "./../../redux/action";
import MeanConfig from "../../config/menuConfig";
import "./index.less";

const SubMenu = Menu.SubMenu;
class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.renderMenu = this.renderMenu.bind(this);
    this.handelClick = this.handelClick.bind(this);
    this.state = {
      currentKey: ""
    };
  }
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MeanConfig);
    // 筛选出路由
    let currentKey = window.location.hash.replace(/#|\?.*$/, "");
    console.log(currentKey);
    this.setState({
      menuTreeNode,
      currentKey
    });
  }

  // 菜单渲染
  renderMenu(data) {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  }
  handelClick({ item, key }) {
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
      currentKey: key
    });
  }
  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>Imooc MS</h1>
        </div>
        <div>
          <Menu
            theme="dark"
            selectedKeys={[this.state.currentKey]}
            onClick={this.handelClick}
          >
            {this.state.menuTreeNode}
          </Menu>
        </div>
      </div>
    );
  }
}

export default connect()(NavLeft);
