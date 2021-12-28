import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const FootfallsChart = ({ dates, labels, men, women }) => {
  // console.log(orders)
  // console.log(dates, " ", orders, "    ", labels);
  const date = dates.map(item => {
    return item.charAt(8) + item.charAt(9)
  })
  const menData = new Array(labels?.length).fill(0);
  for (let i = 0; i < men?.length; i++) {
    menData[date[i] - 1] = men[i];
  }
  const womenData = new Array(labels?.length).fill(0);
  for (let i = 0; i < women?.length; i++) {
    womenData[date[i] - 1] = women[i];
  }
  console.log(menData);

  console.log(womenData);
  // console.log(orders)
  const data = {
    labels: labels,
    datasets: [
      {
        label: "men",
        data: menData,
        backgroundColor: menData.map((item) => getRandomColor()),
        borderWidth: 1,
      },
      {
        label: "women",
        data: womenData,
        backgroundColor: womenData.map((item) => getRandomColor()),
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
          Footfalls by Gender
        </h1>
      </div>
      <Bar data={data} options={options} height="90%" />
    </>
  );
};

export default FootfallsChart;
