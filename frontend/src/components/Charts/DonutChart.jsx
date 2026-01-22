import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Donut() {
    return (
        <>
            <div className="chart-area">
                <Doughnut
                    data={{
                        labels: ['a', 'b', 'c'],
                        datasets: [{
                            label: 'revue',
                            data: [200, 300, 400]
                        },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false
                    }}
                />
            </div>
            <div className='charts__description'>
                <button className='btn'>button</button>
                <button className='btn'>button</button>
            </div>
        </>
    )
}