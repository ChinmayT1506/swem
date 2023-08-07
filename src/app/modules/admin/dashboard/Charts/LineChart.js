import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","July",
  "Aug","Sept", "Oct", "Nov", "Dec"],
  datasets: [
    // {
    //   label: "First dataset",
    //   data: [33, 53, 85, 41, 44, 65],
    //   fill: true,
    //   backgroundColor: "rgba(75,192,192,0.2)",
    //   borderColor: "rgba(75,192,192,1)"
    // },
    {
      label: "Sample dataset",
      data: [0, 0, 0, 10, 24, 36, 20, 28, 39, 30, 14, 35],
      fill: false,
      borderColor: "blue"
    }
  ]
};

let options = {
  responsive: true,
  maintainAspectRatio: true
}

export default function LineChart() {
  return (
    <div>
      <Line data={data} options={options}/>
    </div>
  );
}
