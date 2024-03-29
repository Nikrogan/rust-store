'use client'
import '@mantine/dates/styles.css';
import { StatsGrid } from "@/components/StatsGrid";
import { AreaChart } from "@mantine/charts";
import { Badge, Box, Button, Flex, Group, Image, Input, Table, Tabs, TabsList } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { IconHomeStats,  IconSettings, IconWallet } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import styled from './styled.module.css';
import { Product } from '@/components/product';
import { ModalProduct } from '@/components/ModalProduct';
import { useDisclosure } from '@mantine/hooks';
import { NewsList } from '@/pageComponents/news/news';
import { StatsPanel } from '@/AdminComponents/StatsPanel/StatsPanel';
import { MainStat } from '@/AdminComponents/MainStat/MainStat';
import { useUnit } from 'effector-react';
import { $promocodes, $salary, getPromocodesEvent } from './store';
import { theme } from '@/components/theme/theme';
import { Products } from '@/AdminComponents/Products/ui/products';

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

 const a = {
    payload: [
        {
            date: 'Mar 22',
            sum: 123123123 
        }
    ]
 }

export default function StorePage() {
    const {promocodesList, salary, getPromocodes} = useUnit({
        salary: $salary,
        getPromocodes: getPromocodesEvent,
        promocodesList: $promocodes,
    });
    const [activeTab, setActiveTab] = useState<string | null>('gallery');

    useEffect(() => {
        getPromocodes()
    }, [])

    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const getCurrentDay = new Date()
    var d = new Date();
    const a = []
    for(let i = 0; i < 100; i++) {
        a.push(i)
    }
   
    d.setMonth(d.getMonth() - 1);

    const rows = promocodesList && promocodesList.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.promoCode}</Table.Td>
            <Table.Td>{element.moneyValue}</Table.Td>
            <Table.Td>{element.alreadyUses}/ {element.maxUses}</Table.Td>
            <Table.Td>{element.createTime}</Table.Td>
            <Table.Td>{element.endTime}</Table.Td>
        </Table.Tr>
    ));

    return <>
        <div>
            <Tabs keepMounted={false} value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="gallery" leftSection={<IconHomeStats />}>
                        Статистика
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
                    <Box>
                        <MainStat data={salary} />
                    </Box>
                    <Box mt={theme.spacing.xl}>
                        <Group>
                            Посещяемость
                        <DatePickerInput
                            valueFormat="DD/MM/YYYY"
                            w={240}
                            placeholder='Выбрать период'
                            defaultValue={[getCurrentDay, d]}
                            type="range"
                            value={value}
                            onChange={setValue}
                        />
                        </Group>
                        <Box mt={43}>        
                            <AreaChart
                                mt={theme.spacing.lg}
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
                        </Box>
                    </Box>

                </Tabs.Panel>

                <Tabs.Panel value="messages">
                    Messages tab content
                </Tabs.Panel>

                <Tabs.Panel value="settings">
                        <Tabs keepMounted={false} orientation="vertical" defaultValue={'sharedSettings'}>
                            <TabsList mt={theme.spacing.md}>
                                <Tabs.Tab value="sharedSettings" >Общие настройки</Tabs.Tab>
                                <Tabs.Tab value="products">Товары</Tabs.Tab>
                                <Tabs.Tab value="servers">Сервера</Tabs.Tab>
                                <Tabs.Tab value="players">Игроки</Tabs.Tab>
                                <Tabs.Tab value="cart">Корзина</Tabs.Tab>
                                <Tabs.Tab value="history">История</Tabs.Tab>
                                <Tabs.Tab value="news">Новости</Tabs.Tab>
                                <Tabs.Tab value="promocodes">Промокоды</Tabs.Tab>
                                <Tabs.Tab value="bonus">Бонусы</Tabs.Tab>
                                <Tabs.Tab value="technical">Техподдержка</Tabs.Tab>
                            </TabsList>
                            <Tabs.Panel value="sharedSettings" p={theme.spacing.md}>
                                Messages tab content
                            </Tabs.Panel>
                                <Products />
                            <Tabs.Panel value='promocodes' p={theme.spacing.md}>
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
                            <Tabs.Panel value="news" p={theme.spacing.md}>
                                    <NewsList />
                            </Tabs.Panel>
                        </Tabs>
                </Tabs.Panel>
            </Tabs>
        </div>
    </>
}