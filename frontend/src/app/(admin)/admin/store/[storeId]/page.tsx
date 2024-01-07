'use client'
import '@mantine/dates/styles.css';
import { StatsGrid } from "@/components/StatsGrid";
import { AreaChart } from "@mantine/charts";
import { Badge, Button, Card, Flex, Group, Image, Input, NavLink, Table, Tabs, TabsList, Text } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { IconHomeStats, IconMessageCircle, IconPhoto, IconSettings, IconWallet } from "@tabler/icons-react";
import { useState } from "react";
import styled from './styled.module.css';
import { Product } from '@/components/product';
import { ModalProduct } from '@/components/ModalProduct';
import { useDisclosure } from '@mantine/hooks';
import { TextEditor } from '@/components/TextEditor';

export const data = [
    {
      date: 'Mar 22',
      Apples: 2890,
      Oranges: 2338,
      Tomatoes: 2452,
    },
    {
      date: 'Mar 23',
      Apples: 2756,
      Oranges: 2103,
      Tomatoes: 2402,
    },
    {
      date: 'Mar 24',
      Apples: 3322,
      Oranges: 986,
      Tomatoes: 1821,
    },
    {
      date: 'Mar 25',
      Apples: 3470,
      Oranges: 2108,
      Tomatoes: 2809,
    },
    {
      date: 'Mar 26',
      Apples: 3129,
      Oranges: 1726,
      Tomatoes: 2290,
    },
  ];

export default function StorePage() {
    const [activeTab, setActiveTab] = useState<string | null>('gallery');
    const [opened, { open, close }] = useDisclosure(false);

    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const getCurrentDay = new Date()
    var d = new Date();
    const a = []
    for(let i = 0; i < 100; i++) {
        a.push(i)
    }
   
    d.setMonth(d.getMonth() - 1);

    const elements = [
        {
            id: '1',
            code: '123123123',
            type: 'asda',
            useCounter: 123,
            createDate: 1231,
            closeDate: 123123
        },
        {
            id: '1',
            code: '123123123',
            type: 'asda',
            useCounter: 123,
            createDate: 1231,
            closeDate: 123123
        },
        {
            id: '1',
            code: '123123123',
            type: 'asda',
            useCounter: 123,
            createDate: 1231,
            closeDate: 123123
        },
        {
            id: '1',
            code: '123123123',
            type: 'asda',
            useCounter: 123,
            createDate: 1231,
            closeDate: 123123
        },
        {
            id: '1',
            code: '123123123',
            type: 'asda',
            useCounter: 123,
            createDate: 1231,
            closeDate: 123123
        },
        {
            id: '1',
            code: '123123123',
            type: 'asda',
            useCounter: 123,
            createDate: 1231,
            closeDate: 123123
        },

    ]
    const rows = elements.map((element) => (
        <Table.Tr key={element.id}>
        <Table.Td>{element.code}</Table.Td>
        <Table.Td>{element.type}</Table.Td>
        <Table.Td>{element.useCounter}</Table.Td>
        <Table.Td>{element.createDate}</Table.Td>
        <Table.Td>{element.closeDate}</Table.Td>
        </Table.Tr>
    ));

    return <>
        <div>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                <Tabs.Tab value="gallery" leftSection={<IconHomeStats />}>
                    Статистика
                </Tabs.Tab>
                <Tabs.Tab value="messages" leftSection={<IconPhoto  />}>
                    Внешний вид
                </Tabs.Tab>
                <Tabs.Tab value="settings" leftSection={<IconSettings />}>
                    Управление
                </Tabs.Tab>
                <Tabs.Tab value="payment" leftSection={<IconWallet />}>
                    Платежи
                </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="gallery">
                    <StatsGrid />
                    <Group>
                        Посещяемость
                        <DatePickerInput
                            defaultValue={[getCurrentDay, d]}
                            type="range"
                            value={value}
                            onChange={setValue}
                        />
                    </Group>

                    <AreaChart
                        h={300}
                        data={data}
                        dataKey="date"
                        series={[
                            { name: 'Apples', color: 'indigo.6' },
                            { name: 'Oranges', color: 'blue.6' },
                            { name: 'Tomatoes', color: 'teal.6' },
                        ]}
                        curveType="linear"
                    />
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    Messages tab content
                </Tabs.Panel>

                <Tabs.Panel value="settings">
                    <div>
                        <Tabs orientation="vertical" defaultValue={'sharedSettings'}>
                            <TabsList>
                                <Tabs.Tab value="sharedSettings">Общие настройки</Tabs.Tab>
                                <Tabs.Tab value="products">Товары</Tabs.Tab>
                                <Tabs.Tab value="settings">Сервера</Tabs.Tab>
                                <Tabs.Tab value="settings">Игроки</Tabs.Tab>
                                <Tabs.Tab value="settings">Корзина</Tabs.Tab>
                                <Tabs.Tab value="settings">История</Tabs.Tab>
                                <Tabs.Tab value="news">Новости</Tabs.Tab>
                                <Tabs.Tab value="promocodes">Промокоды</Tabs.Tab>
                                <Tabs.Tab value="settings">Бонусы</Tabs.Tab>
                                <Tabs.Tab value="settings">Техподдержка</Tabs.Tab>
                            </TabsList>
                            <Tabs.Panel value="sharedSettings">
                                Messages tab content
                            </Tabs.Panel>
                            <Tabs.Panel value="products">
                                <Group>
                                    <Input placeholder='Поиск' ml={8} mr={8} mt={8} mb={16}/>
                                    <Button onClick={open}>Добавить товар</Button>
                                </Group>
                                <Flex gap={20} wrap="wrap" ml={8}>
                                    {a.map((i) => {
                                        return <Product key={i} />
                                    })}
                                </Flex>
                                <ModalProduct isOpen={opened} close={close} />
                            </Tabs.Panel>
                            <Tabs.Panel value='promocodes'>
                                <Table>
                                    <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>PROMO ID</Table.Th>
                                        <Table.Th>Код</Table.Th>
                                        <Table.Th>Тип</Table.Th>
                                        <Table.Th>Кол.во использований</Table.Th>
                                        <Table.Th>Дата создания</Table.Th>
                                        <Table.Th>Дата окончания</Table.Th>
                                        <Table.Th>Действия</Table.Th>
                                    </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {rows}
                                    </Table.Tbody>
                                </Table>
                            </Tabs.Panel>
                            <Tabs.Panel value='news'>
                                    <TextEditor />
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    </>
}