import React, { Component } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";

var dataPoints = [];

class SalesChart extends Component {
  render() {
    const options = {
      theme: "light2",
      title: {
        text: this.props.title,
      },
      axisY: {
        title: "Ammount",
        prefix: "$",
      },
      data: [
        {
          type: "line",
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "$#,##0.00",
          dataPoints: dataPoints,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }

  componentDidMount() {
    var chart = this.chart;
    fetch("https://canvasjs.com/data/gallery/react/nifty-stock-price.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          dataPoints.push({
            x: new Date(data[i].x),
            y: data[i].y,
          });
        }
        chart.render();
      });
  }
}

export default SalesChart;
