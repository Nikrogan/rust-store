import { theme } from "@/components/theme/theme"
import { ServerList } from "@/mock/serverList"
import { $currentServer, changeServerEvent } from "@/store/server"
import { Box, Flex, List, Select, Title, useMantineColorScheme } from "@mantine/core"
import { useUnit } from "effector-react"
import { useEffect, useState } from "react"
import { $shopFilters, getShopFiltersEvent } from "../model"

export const ShopFilters = () => {
    const { colorScheme } = useMantineColorScheme();
    const { shopFilters, currentServer, getFilters, changeServer,  } = useUnit({
        currentServer: $currentServer,
        changeServer: changeServerEvent,
        getFilters: getShopFiltersEvent,
        shopFilters: $shopFilters
    });

    const [ currentFilter, setCurrentFilter ] = useState(shopFilters);

    useEffect(() => {
        getFilters()
    }, []);

    useEffect(() => {
        if(shopFilters) {
            setCurrentFilter(shopFilters[0].id)
        }
    }, [shopFilters]);

    const FiltersView = shopFilters && shopFilters.map(item => {
        return <Box p={theme.spacing.xs} style={{color: currentFilter === item.id ? 'red': '', cursor: 'pointer'}} key={item.title + item.id} onClick={() => setCurrentFilter(item.id)}>{item.title}</Box>
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