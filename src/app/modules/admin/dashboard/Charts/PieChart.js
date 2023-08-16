import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './piechart.scss'

export function PieChart({ PieData }) {

    const eventWiseCount = Array.from(PieData?.map(item => {
        return item.count
    }))

    const labelsdata = Array.from(PieData?.map(item => {
        return item.eventName
    }))

    console.log(PieData)

    ChartJS.register(ArcElement, Tooltip, Legend);

    let options = {
        responsive: true,
        maintainAspectRatio: false,
    }
    
    const data = {
        labels: labelsdata,
        datasets: [
            {
                label: '',
                data: eventWiseCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    return <Pie className="Pie" data={data} options={options} />;
}
