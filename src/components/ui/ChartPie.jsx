import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useMediaQuery from '../../hooks/useMediaQuery';
import { colorsArray } from '../../helpers/colorsArray';
import { valorPallgrow } from '../../helpers/eliminarEs';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartPie = ({ pallgrow=[] }) => {

    const matches = useMediaQuery("(min-width: 768px)");

    let labels = []
    let dataFinal = []

    const noWeight = pallgrow.filter(p => p.name !== "weight_10") || []
    // const pallgrowArray = pallgrow.filter(p => p.valor !== "0" && p.valor !== "") || []
    const pallgrowArray = noWeight.filter(p => p.valor !== "0" && p.valor !== "" && valorPallgrow(p.valor) > 0) || []

    for (let item of pallgrowArray) {
        labels.push(item.label)
        Array.isArray(item.valor)
        ? dataFinal.push(valorPallgrow(item.valor) * 100)
        : dataFinal.push(item.valor)
    }

    let colors = colorsArray.slice(0, (pallgrowArray.length)) || ["#d6534c"]


    const chartdata = {
        labels: labels || "No Data",
        datasets: [
            {
                label: "Markets Monitored",
                data: dataFinal || 0,
                backgroundColor: colors,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(0, 207, 128, 1)',
                // ],
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        // responsive: true,
        // maintainAspectRatio: true,
        plugins: {
            legend: {
                position: matches ? 'left' : 'top',
            },
            labels: {
                render: 'labels'
            }
        },

        datalabels: {
            display: true,
            color: "white",
        },
        tooltips: {
            backgroundColor: "#5a6e7f",
        },
    }

    return (
        <>
            {
                pallgrowArray.length > 0 &&
                <div className="chart-1 mb-1 mt-2">
                    <Doughnut
                        options={options}
                        data={chartdata}
                    />
                </div>
            }
        </>
    )
}
