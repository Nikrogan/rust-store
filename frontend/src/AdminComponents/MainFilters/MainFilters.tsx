import { Box, Button, Flex, Title } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { IconCalendar, IconTimeline } from "@tabler/icons-react"
import { useState } from "react";
import '@mantine/dates/styles.css';
export const MainFilters = () => {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

    const getCurrentDay = new Date()
    var d = new Date();
    const a = []
    for(let i = 0; i < 100; i++) {
        a.push(i)
    }

    console.log(value !== null && new Date(value[0]))
   
    d.setMonth(d.getMonth() - 1);
    return <Flex align='center' justify="space-between">
        <Box>
            <Flex align="center">
                <IconTimeline height={32} width={32}/>
                <Title>Доходы</Title>
                <IconCalendar height={32} width={32}/>
                <DatePickerInput
                    valueFormat="DD MMM YYYY"
                    w={240}
                    placeholder='Выбрать период'
                    defaultValue={[getCurrentDay, d]}
                    type="range"
                    value={value}
                    onChange={setValue}
                />
            </Flex>
        </Box>
        <Box>
            <Button>Обновить</Button>
        </Box>
    </Flex>
}