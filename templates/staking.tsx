import type React from "react"
import { Line } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const StakingTemplate: React.FC = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "AGC/SOL",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "AGC/IDR",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div>
      <h1>Staking Dashboard</h1>
      <Line data={data} options={options} />
    </div>
  )
}

export default StakingTemplate
