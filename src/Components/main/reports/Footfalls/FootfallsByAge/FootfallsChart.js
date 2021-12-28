import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const FootfallsChart = ({ dates, labels, orders }) => {
  let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0, c7 = 0;
  orders.map(item => {
    c1 += item[0];
    c2 += item[1];
    c3 += item[2];
    c4 += item[3];
    c5 += item[4];
    c6 += item[5];
    c7 += item[6];

  })
  const showData = [c1, c2, c3, c4, c5, c6, c7]

  const data = {
    labels: labels,
    datasets: [
      {
        // label: "Average Orders Value",
        data: showData,
        backgroundColor: orders.map((item) => getRandomColor()),
        borderWidth: 1,
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

  function getRandomColor() {
    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // useEffect(() => {
  //   const loadData = () => {
  //     const newOrders = ordersData.map((item) => item.y);
  //     const newLabels = ordersData.map((item) => {
  //       return item.x;
  //     });
  //     setOrders(newOrders);
  //     setLabels(newLabels);
  //   };

  //   loadData();
  // }, [ordersData]);

  return (
    <>
      <div className="header">
        <h1 className="title" style={{ textAlign: "center" }}>
          Footfalls By Age
        </h1>
      </div>
      <Bar data={data} options={options} height="90%" />
    </>
  );
};

export default FootfallsChart;
