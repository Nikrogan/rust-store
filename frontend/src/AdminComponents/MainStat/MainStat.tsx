import { AreaChart } from "@mantine/charts"
import { Box } from "@mantine/core"
import { MainFilters } from "../MainFilters/MainFilters"
import { theme } from "@/components/theme/theme"

export const MainStat = ({data}) => {
    return <Box>
        <MainFilters />
        <AreaChart
            h={300}
            mt={theme.spacing.lg}
            data={data}
            dataKey="date"
            series={[
                { name: 'Apples', color: 'indigo.6' },
                ]}
            curveType="linear"
        />
    </Box>
}