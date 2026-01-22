import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function LineChart() {

    return (
        <>
            <div className="chart-area">
                <Line
                    data={{
                        labels: ['a', 'b', 'c'],
                        datasets: [{
                            label: 'revue',
                            data: [200, 300, 100]
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