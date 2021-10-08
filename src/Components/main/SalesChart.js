import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const SalesChart = ({ ordersData, month }) => {
  const [orders, setOrders] = useState([]);
  const [labels, setLabels] = useState([]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Sales",
        data: orders,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
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
        <h1 className="title" style={{ textAlign: "center" }}>
          Sales
        </h1>
      </div>
      <Line data={data} options={options} height="90%" />
    </>
  );
};

export default SalesChart;
