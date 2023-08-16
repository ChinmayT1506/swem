import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

export default function LineChart({ Linedata }) {

  const yearWiseCount = Array.from(Linedata?.map(item => {
    return item.count
  }))

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July",
      "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      // {
      //   label: "First dataset",
      //   data: [33, 53, 85, 41, 44, 65],
      //   fill: true,
      //   backgroundColor: "rgba(75,192,192,0.2)",
      //   borderColor: "rgba(75,192,192,1)"
      // },
      {
        label: "count",
        data: yearWiseCount,
        fill: true,
        borderColor: "blue",
      }
    ]
  };

  let options = {
    responsive: true,
    maintainAspectRatio: true
  }
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}
