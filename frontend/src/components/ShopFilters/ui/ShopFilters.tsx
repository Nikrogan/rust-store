import { theme } from "@/components/theme/theme"
import { ServerList } from "@/mock/serverList"
import { $currentServer, changeServerEvent } from "@/store/server"
import { Box, Flex, List, Select, Title, useMantineColorScheme } from "@mantine/core"
import { useUnit } from "effector-react"
import { useState } from "react"



const Filters = [
    {
        title: 'Все товары',
        value: 'all'
    },
    {
        title: 'Оружие',
        value: 'weapon'
    },
    {
        title: 'Ресурсы',
        value: 'resources'
    },
    {
        title: 'Боеприпасы',
        value: 'ammunition'
    },
    {
        title: 'Одежда',
        value: 'clothes'
    },
    {
        title: 'Конструкции',
        value: 'construction'
    },
    {
        title: 'Инструменты',
        value: 'tools'
    },
]

export const ShopFilters = () => {
    const {colorScheme} = useMantineColorScheme();
    const currentServer = useUnit($currentServer);
    const changeServer = useUnit(changeServerEvent);
    const [currentFilter, setCurrentFilter] = useState('all');
    console.log(currentFilter)
    const FiltersView = Filters.map(item => {
        return <Box p={theme.spacing.xs} style={{color: currentFilter === item.value ? 'red': '', cursor: 'pointer'}} key={item.title + item.value} onClick={() => setCurrentFilter(item.value)}>{item.title}</Box>
    });

    return (
        <Flex direction='column' bg={colorScheme === 'dark' ? theme.colors?.dark?.[9] : theme.colors?.blue?.[0]} p={theme.spacing?.md} style={{borderRadius: theme.radius.xs}}>
            <Title>Сервера</Title>
            <Select mt={theme.spacing.md} data={ServerList.map(item => item.title)} value={currentServer?.title} onChange={(data) => {
                const currentServer = ServerList.filter((server) => server.title === data)
                changeServer(currentServer[0])
            }} />
            <Title mt={theme.spacing.md}>Категории</Title>
            <Flex mt={theme.spacing.md} direction='column' >
                {FiltersView}
            </Flex>
        </Flex>
    )
}