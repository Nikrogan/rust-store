import { LineCharts } from "@/components/LineCharts";
import { StatsGrid } from "@/components/StatsGrid";
import styled from "styled-components";

export const AdminMainPage = () => {
    return <div>
        <StatsGrid />
        <LineChartsContainer>
            <LineCharts data={data}  />
        </LineChartsContainer>
    </div>
}


const generateDatesForMonth = () => {
    const startDate = new Date();
    startDate.setDate(1); // Устанавливаем начальную дату на первое число текущего месяца
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // Устанавливаем конечную дату на первое число следующего месяца
  
    const dates = [];
    for (let d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    
    return dates;
  };
  

const data = generateDatesForMonth().map((date, index) => {
    return {
        name: date.toDateString(),
        'Free Daily Weapon & Resources rulette #1': 222 + index,
        'Free Daily Weapon & Resources roulette #4': 245 + index,
        'Survivor Free': 74 + index
    }
})

const LineChartsContainer = styled.div`
    margin-top: 36px;
`