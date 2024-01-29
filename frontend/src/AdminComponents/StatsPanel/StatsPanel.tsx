import { Flex } from "@mantine/core"
import { StatBox } from "../StatBox/StatBox"

const MockData = [
    {
        type: 'current',
        amount: 0
    },
    {
        type: 'halfmonth',
        amount: 170
    },
    {
        type: 'month',
        amount: 1070
    },
    {
        type: 'alltime',
        amount: 10070
    },
]

export const StatsPanel = () => {
    const Content = MockData.map(item => {
        return <StatBox amount={item.amount} type={item.type}/>
    })
    return <Flex mt={56}>
        {Content}
    </Flex>
}