import BarChart from "./Charts/BarChart"
import DonutChart from "./Charts/DonutChart"
import LineChart from "./Charts/LineChart"
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'

export default function Content() {
    return (
        <>
            <div className='charts wrapper'>
                <div className='charts__chart'>
                   <BarChart/>
                </div>
                <div className='charts__chart'>
                    <DonutChart/>
                </div>
                <div className='charts__chart'>
                    <LineChart/>
                </div>
                <div className='charts__chart'>
                    <div className="chart-area">
                        <h1>Рекомендация</h1>
                        <p></p>
                    </div>
                </div>
                <div className='charts__chart'>
                    <div className="chart-area">
                        <h1>Рекомендация</h1>
                        <p></p>
                    </div>
                </div>
                <input type="file"
                    accept='.json'
                />
            </div>
        </>
    )
}