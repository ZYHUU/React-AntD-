import React, { Component } from "react";
import { Card } from "antd";
import axios from "../../axios";
import "./detail.less";

export default class Detail extends Component {
  state = {};

  componentDidMount() {
    let orderId = this.props.match.params.orderId;
    console.log(orderId);
    if (orderId) {
      this.getDetailInfo(orderId);
    }
  }
  getDetailInfo = orderId => {
    axios
      .ajax({
        url: "/order/detail",
        data: {
          params: {
            orderId: orderId
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            orderInfo: res.result
          });
          this.renderMap(res.result);
        }
      });
  };

  // 初始化地图
  renderMap = result => {
    this.map = new window.BMap.Map("orderDetailMap");
    // 添加地图控件
    this.addMapControl();
    // 路线图绘制
    this.drawBikeRoute(result.position_list);
    // 服务区绘制
    this.drawServiceArea(result.area);
  };

  // 添加地图控件
  addMapControl = () => {
    let map = this.map;
    map.addControl(
      new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })
    );
    map.addControl(
      new window.BMap.NavigationControl({
        anchor: window.BMAP_ANCHOR_TOP_RIGHT
      })
    );
  };

  // 路线图绘制
  drawBikeRoute = positionList => {
    let startPoint = "";
    let endPoint = "";
    if (positionList.length > 0) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];
      startPoint = new window.BMap.Point(first.lon, first.lat);
      let startIcon = new window.BMap.Icon(
        "/assets/start_point.png",
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(36, 42)
        }
      );
      // 添加起始Marker
      let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
      this.map.addOverlay(startMarker);

      endPoint = new window.BMap.Point(last.lon, last.lat);
      let endIcon = new window.BMap.Icon(
        "/assets/end_point.png",
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(36, 42)
        }
      );
      // 添加结束Marker
      let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
      this.map.addOverlay(endMarker);

      // 连接地图
      let trackPoint = [];
      for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i];
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));
      }
      console.log(trackPoint, "trackPoint");
      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: "#EE113D",
        strokeWeight: 3,
        strokeOpcity: 1
      });
      this.map.addOverlay(polyline);
      // 添加地图中心点
      this.map.centerAndZoom(endPoint, 11);
    }
  };

  // 绘制服务区
  drawServiceArea = area => {
    let trackPoint = [];
    for (let i = 0; i < area.length; i++) {
      let point = area[i];
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    }
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: "#CE0000",
      strokeWeight: 4,
      strokeOpcity: 1,
      fillColor: "#ff8605"
    });
    this.map.addOverlay(polygon);
  };

  render() {
    const info = this.state.orderInfo || {};
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map" />
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-from clearfix">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">
                  {info.mode === 1 ? "服务区" : "停车点"}
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编码</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bick_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-from clearfix">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程历程</div>
                <div className="detail-form-content">
                  {info.distance / 1000}
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
