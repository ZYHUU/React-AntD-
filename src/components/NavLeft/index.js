import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import MeanConfig from '../../config/menuConfig';
import './index.less';


const SubMenu = Menu.SubMenu;
class NavLeft extends Component{
    constructor(props) {
        super(props);
        this.renderMenu = this.renderMenu.bind(this);
        this.handelClick = this.handelClick.bind(this);
    }
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MeanConfig);
        this.setState({
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu(data) {
        return data.map((item) => {
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    handelClick() {
        console.log(this.state.menuTreeNode)
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu
                    theme="dark"
                    onClick={this.handelClick}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

export default NavLeft