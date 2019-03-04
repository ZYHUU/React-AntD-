import React, { Component } from "react";
import { Card } from "antd";
// 主题
import echartTheme from "./../themeLight";
// 按需加载
import echarts from "echarts/lib/echarts";
// 导入饼形图
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";

export default class Pie extends Component {
  componentWillMount() {
    // 注入主题 render 之前注入
    echarts.registerTheme("Imooc", echartTheme);
  }

  getOption = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center"
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 10,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)"
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          data: [
            {
              value: 1000,
              name: "周一"
            },
            {
              value: 2000,
              name: "周二"
            },
            {
              value: 3000,
              name: "周三"
            },
            {
              value: 4000,
              name: "周四"
            },
            {
              value: 5000,
              name: "周五"
            },
            {
              value: 6000,
              name: "周六"
            },
            {
              value: 5000,
              name: "周日"
            }
          ]
        }
      ]
    };
    return option;
  };

  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center"
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 10,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)"
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          radius: ["50%", "80%"],
          center: ["50%", "60%"],
          data: [
            {
              value: 1000,
              name: "周一"
            },
            {
              value: 2000,
              name: "周二"
            },
            {
              value: 3000,
              name: "周三"
            },
            {
              value: 4000,
              name: "周四"
            },
            {
              value: 5000,
              name: "周五"
            },
            {
              value: 6000,
              name: "周六"
            },
            {
              value: 5000,
              name: "周日"
            }
          ]
        }
      ]
    };
    return option;
  };

  getOption3 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
        x: "center"
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 10,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)"
      },
      series: [
        {
          name: "订单量",
          type: "pie",

          data: [
            {
              value: 1000,
              name: "周一"
            },
            {
              value: 2000,
              name: "周二"
            },
            {
              value: 3000,
              name: "周三"
            },
            {
              value: 4000,
              name: "周四"
            },
            {
              value: 5000,
              name: "周五"
            },
            {
              value: 6000,
              name: "周六"
            },
            {
              value: 5000,
              name: "周日"
            }
          ].sort((a, b) => {
            return a.value - b.value;
          }),
          roseType: "radius",
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
    return option;
  };

  render() {
    return (
      <div>
        <Card title="饼形图表一">
          <ReactEcharts
            option={this.getOption()}
            theme="Imooc"
            style={{ height: 400 }}
          />
        </Card>
        <Card title="饼形图表二">
          <ReactEcharts
            option={this.getOption2()}
            theme="Imooc"
            style={{ height: 400 }}
          />
        </Card>
        <Card title="饼形图表三">
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
