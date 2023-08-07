import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './piechart.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Blue', 'Red'],
    datasets: [
        {
            label: '#',
            data: [20, 80],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

let options = {
    responsive: true,
    maintainAspectRatio: false
}

export function PieChart() {
    return <Pie className="Pie" data={data} options={options} />;
}
