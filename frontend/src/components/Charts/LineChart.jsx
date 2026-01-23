import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

export default function LineChart({ data, theme }) {
    const chartData = data || {}

    const labels = Object.keys(chartData)
    const values = Object.values(chartData)
    const total = values.reduce((acc, val) => acc + val, 0)

    const colors = {
        light: {
            background: "#FFFFFF",
            text: "#000000",
            grid: "#CCCCCC",
            line: "#87ABFE",
            point: "#3760BF",
            fill: "rgba(135, 171, 254, 0.3)"
        },
        dark: {
            background: "#1F1F2E",
            text: "#E0E0E0",
            grid: "#555555",
            line: "#BB86FC",
            point: "#8132F0",
            fill: "rgba(187, 134, 252, 0.3)"
        }
    }
    const current = theme ? colors.dark : colors.light

    return (
        <div className="chart-area">
            <h1 className='sidebar__title'>Проблемы по районам</h1>
            <Line
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Районы',
                            data: values,
                            borderColor: current.line,
                            backgroundColor: current.fill,
                            tension: 0.4,
                            fill: true,
                            pointRadius: 5,
                            pointBackgroundColor: current.point,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: current.text
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: current.text },
                            grid: { color: current.grid }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: { color: current.text },
                            grid: { color: current.grid }
                        }
                    }
                }}
            />
        </div>
    )
}
