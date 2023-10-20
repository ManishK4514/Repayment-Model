import React, { useState } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement
);

function App() {
    const [accountArray, setAccountArray] = useState([]);
    const [monthlyPayment, setMonthlyPayment] = useState(450);
    const [initialBalance, setInitialBalance] = useState(5000); // Initial balance state

    const [chartData, setChartData] = useState({
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: "Balance",
                data: [
                    5500, 5050, 4600, 4150, 3700, 3250, 2800, 2350, 1900, 1450,
                    1000, 550,
                ],
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "cyan",
            },
        ],
    });

    const options = {
        scales: {
            x: {
                ticks: {
                    color: "#e9dfdfe6",
                },
                grid: {
                    color: "#3f3d3de6",
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#e9dfdfe6",
                },
                grid: {
                    color: "#3f3d3de6",
                },
            },
        },
    };

    const handlePaymentChange = (e) => {
        setMonthlyPayment(Number(e.target.value));
    };

    const handlePaymentSubmit = () => {
        const newData = [];

        let balance = initialBalance;
        while (balance >= 0) {
            newData.push(balance);
            balance -= monthlyPayment;
        }

        setChartData((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: newData,
                },
            ],
        }));
    };

    const handleAccountSubmit = () => {
        const enteredBalance = Number(
            document.getElementById("balanceInput").value
        );
        setAccountArray((prevArray) => [...prevArray, enteredBalance]);

        document.getElementById("balanceInput").value = "";
    };

    const handleUserItemClick = (balance) => {
        setInitialBalance(balance); // Update the initialBalance when a User-List-item is clicked
    };

    return (
        <>
            <section>
                <div className="left">
                    <h1>Accounts</h1>
                    <div className="div">{`Count: ${accountArray.length}`}</div>
                    <span>Enter Balance: </span>
                    <input
                        className="Accounts-input"
                        type="number"
                        id="balanceInput"
                    />
                    <button
                        className="Submit-btn"
                        onClick={handleAccountSubmit}
                    >
                        Submit
                    </button>

                    <ol className="User-List-Div">
                        {accountArray.map((item, index) => (
                            <div className="User-List">
                                <li
                                    className="User-List-item"
                                    key={index}
                                    onClick={() => handleUserItemClick(item)}
                                >
                                    {item}
                                </li>
                            </div>
                        ))}
                    </ol>
                </div>
                <div className="right">
                    <div className="top">
                        <h2>Initial Balance: {initialBalance} ₹</h2>
                        <span>Monthly Payment: </span>
                        <input
                            type="number"
                            value={monthlyPayment}
                            onChange={handlePaymentChange}
                        />
                        <button
                            className="Submit-btn"
                            onClick={handlePaymentSubmit}
                        >
                            Submit
                        </button>

                        <div>Balance of account after number of months</div>

                        <div className="chart">
                            <Line data={chartData} options={options} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;