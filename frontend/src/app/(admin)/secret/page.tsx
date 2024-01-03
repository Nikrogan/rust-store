'use client'
import { theme } from '@/components/theme/theme'
import styles from './page.module.css'
import { MantineProvider } from '@mantine/core'
import { AdminNavBar } from '@/components/AdminNavBar'
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, LineElement, LinearScale, PointElement, Tooltip, Utils } from "chart.js";
import  styled from './styled.module.css'
const labels = Utils.months({count: 12});

const lineChartData = {
  labels: labels,
  tooltipItems: ["Аниме"],
  datasets: [
    {
      data: [100, 80, 220, 60, 10],
      label: "Пополнения",
      borderColor: "green",
      fill: true,
      lineTension: 0.4
    },
    {
      data: [100, 80, 100, 60, 10],
      label: "Покупки",
      borderColor: "blue",
      fill: true,
      lineTension: 0.4
    },
  ]
};

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement)
Chart.register(Tooltip)
 
export default function Home() {
  return (
    <main className='main'>
      <MantineProvider theme={theme}>
            <AdminNavBar />
        <div className={styled.test}>
              <Line data={lineChartData}
            options={{
              
          }}/>
      </div>
      </MantineProvider>
    </main>
  )
}
