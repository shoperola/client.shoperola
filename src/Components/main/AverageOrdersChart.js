import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const AverageOrdersChart = ({ ordersData }) => {
  const [labels, setLabels] = useState([]);
  const [orders, setOrders] = useState([]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Average Orders Value",
        data: orders,
        // backgroundColor: [
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(54, 162, 235, 0.2)",
        //   "rgba(255, 206, 86, 0.2)",
        //   "rgba(75, 192, 192, 0.2)",
        //   "rgba(153, 102, 255, 0.2)",
        //   "rgba(255, 159, 64, 0.2)",
        // ],
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    const loadData = () => {
      const newOrders = ordersData.map((item) => item.y);
      const newLabels = ordersData.map((item) => {
        return item.x;
      });
      setOrders(newOrders);
      setLabels(newLabels);
    };

    loadData();
  }, [ordersData]);

  return (
    <>
      <div className="header">
        <h1 className="title">Average Orders Value Chart</h1>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default AverageOrdersChart;
