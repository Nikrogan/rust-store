import { AreaChart } from "@mantine/charts"
import { Box } from "@mantine/core"
import { MainFilters } from "../MainFilters/MainFilters"

export const MainStat = ({data}) => {
    return <Box p={52} bg="#F7F7F7" mt={43}>
        <MainFilters />
        <AreaChart
            h={300}
            mt={128}
            data={data}
            dataKey="date"
            series={[
            { name: 'Apples', color: 'indigo.6' },
            ]}
            curveType="linear"
        />
    </Box>
}