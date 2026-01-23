import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ data, theme }) {
    const ALL_MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        if (!data) return;

        const monthly = {};
        Object.entries(data).forEach(([date, value]) => {
            const [year, month] = date.split("-");
            const key = `${year}-${month}`;
            monthly[key] = (monthly[key] || 0) + value;
        });

        const sortedKeys = Object.keys(monthly).sort();

        const newLabels = [];
        const newValues = [];
        sortedKeys.forEach(key => {
            const [year, month] = key.split("-");
            newLabels.push(`${ALL_MONTHS[Number(month) - 1]} ${year}`);
            newValues.push(monthly[key]);
        });

        setKeys(sortedKeys);
        setLabels(newLabels);
        setValues(newValues);
    }, [data]);

    const filteredLabels = labels.filter((_, idx) => {
        if (!from || !to) return true;
        return keys[idx] >= from && keys[idx] <= to;
    });

    const filteredValues = values.filter((_, idx) => {
        if (!from || !to) return true;
        return keys[idx] >= from && keys[idx] <= to;
    });

    const colors = {
        light: {
            background: "#FFFFFF",
            text: "#000000",
            grid: "#CCCCCC",
            bar: "#87ABFE"
        },
        dark: {
            background: "#1F1F2E",
            text: "#E0E0E0",
            grid: "#555555",
            bar: "#BB86FC"
        }
    };
    const current = theme ? colors.dark : colors.light;

    return (
        <div className="chart-area">
            <h1 className='sidebar__title'>Проблемы по месяцам</h1>
            <div className="chart-area">
                <Bar
                    data={{
                        labels: filteredLabels,
                        datasets: [{
                            label: "Количество",
                            data: filteredValues,
                            backgroundColor: current.bar
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
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
                                ticks: { color: current.text },
                                grid: { color: current.grid }
                            }
                        }
                    }}
                />
            </div>

            <div className="charts__description">
                <label>
                    С:
                    <input className="charts__date" type="month" value={from} onChange={e => setFrom(e.target.value)} />
                </label>

                <label>
                    По:
                    <input className="charts__date" type="month" value={to} onChange={e => setTo(e.target.value)} />
                </label>
            </div>
        </div>
    );
}
