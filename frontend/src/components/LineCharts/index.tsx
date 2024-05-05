import { color } from "@/config/theme"
import { useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import styled from "styled-components"

export const LineCharts = ({data}) => {
    
    const newDates = data.reduce((acc, el) => {
        const copyObj = {
            ...el
        }

        delete copyObj.name;

        const keys = Object.keys(copyObj)
        return {
            ...acc,
            ...keys,
        }
    }, {});

    const lineView = Object.values(newDates).map((key) => {
        return <Line dataKey={key}  activeDot={{ r: 6 }}/>
    });

    return <LineChart 
    data={data} 
    width={1440}
    height={300}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip content={CustomTooltop}/>
    {lineView}
  </LineChart>
}

const CustomTooltop = ({ active, payload, label }) => {
    if (!active && !payload && !payload.length) return null;
    return <TooltipText>
        <TooltipLabel>
          {label}
        </TooltipLabel>
        {payload.map((el) => {
            return <div>{el.name}: {el.value}</div>
        })}

    </TooltipText>
}

const TooltipText = styled.div`
    background: ${color.secondary};
    padding: 6px;
`

const TooltipLabel = styled.div`
    color: red;

`