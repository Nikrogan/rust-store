import { Flex, List, Select, Title } from "@mantine/core"

export const ShopFilters = () => {
    return (
        <Flex direction='column'>
            <Title>Сервера</Title>
            <Select />
            <Title>Категории</Title>
            <List>
                <List.Item>Все товары</List.Item>
                <List.Item>Оружие</List.Item>
                <List.Item>Ресурсы</List.Item>
                <List.Item>Боеприпасы</List.Item>
                <List.Item>Одежда</List.Item>
                <List.Item>Конструкции</List.Item>
                <List.Item>Инструменты</List.Item>
            </List>
        </Flex>
    )
}