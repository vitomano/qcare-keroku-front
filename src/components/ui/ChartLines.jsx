import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
//   import faker from 'faker';

// import useMediaQuery from '../../hooks/useMediaQuery';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const ChartLines = () => {

    // const matches = useMediaQuery("(min-width: 768px)");

    const labels = ['Rot', 'Mould', 'Wet/Open', 'Split', 'Dehydration', 'Soft', 'Sensitive', 'Misformed', 'Damage', 'Unripe', 'Undersized'];


    const chartdata = {
        labels,
        datasets: [
            {
                label: "Pallet 1",
                data: [1, 2, 1, 0, 0, 3, 1, 1, 0, 1, 2],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                tension: 0.1
            },
            {
                label: "Pallet 2",
                data: [1, 3, 0, 4, 2, 0, 2, 1, 3, 0, 1],
                fill: false,
                borderColor: 'rgba(0, 207, 128, 1)',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                tension: 0.1
            },
        ],
    };

    const options = {
        // responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        //   title: {
        //     display: true,
        //     text: 'Chart.js Line Chart',
        //   },
        },
        
    }

    return (
        <div className="chart-1">
            <Line
                options={options}
                data={chartdata}
            />
        </div>
    )
}
