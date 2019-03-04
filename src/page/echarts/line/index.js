import React, { Component } from "react";
import { Card } from "antd";
// 主题
import echartTheme from "./../themeLight";
// 按需加载
import echarts from "echarts/lib/echarts";
// 导入饼形图
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";

export default class Line extends Component {
  componentWillMount() {
    // 注入主题 render 之前注入
    echarts.registerTheme("Imooc", echartTheme);
  }

  getOption2 = () => {
    let option = {
      title: {
        text: "订单"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["哈罗订单量", "OFO订单量"]
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "哈罗订单量",
          type: "line",
          data: [2000, 3000, 4000, 6000, 8000, 10000, 12000]
        },
        {
          name: "OFO订单量",
          type: "line",
          data: [1200, 1300, 3000, 4000, 6000, 8000, 10000]
        }
      ]
    };
    return option;
  };

  getOption = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单量",
          type: "line",
          data: [1000, 2000, 1500, 4000, 1000, 1200, 3800]
        }
      ]
    };
    return option;
  };

  getOption3 = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        boundaryGop: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单量",
          type: "line",
          data: [1000, 2000, 1500, 4000, 1000, 1200, 3800],
          areaStyle: {}
        }
      ]
    };
    return option;
  };

  render() {
    return (
      <div>
        <Card title="折线图表一">
          <ReactEcharts
            option={this.getOption()}
            theme="Imooc"
            style={{ height: 400 }}
          />
        </Card>
        <Card title="折线图表二">
          <ReactEcharts
            option={this.getOption2()}
            theme="Imooc"
            style={{ height: 400 }}
          />
        </Card>
        <Card title="折线图表三">
          <ReactEcharts
            option={this.getOption3()}
            theme="Imooc"
            style={{ height: 400 }}
          />
        </Card>
      </div>
    );
  }
}
