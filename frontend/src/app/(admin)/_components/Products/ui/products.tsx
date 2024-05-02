'use client'
import { SimpleAction } from "@/shared/utils/simpleAction";
import { Button, Flex, Group, Input, Tabs } from "@mantine/core"
import { PageTitle } from "../../PageTitle";

export const Products = () => {

    return (
        <>
        <PageTitle title='Страница товаров магазина'>
            <Input placeholder='Поиск' ml={8} mr={8} mt={8} mb={16} />
            <Button onClick={SimpleAction}>Добавить товар</Button>
        </PageTitle>
        <Flex gap={20} wrap="wrap" ml={8}>
        </Flex>
        </>
    )
}