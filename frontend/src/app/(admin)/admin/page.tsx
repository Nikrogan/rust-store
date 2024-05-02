'use client'
import '@mantine/dates/styles.css';
import { StatsGrid } from "@/components/StatsGrid";
import { AreaChart } from "@mantine/charts";
import { Box,  Group, Tabs, TabsList } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { IconHomeStats,  IconSettings, IconWallet } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { MainStat } from '@/AdminComponents/MainStat/MainStat';
import { useUnit } from 'effector-react';
import { $promocodes, $salary, getPromocodesEvent } from './store';
import { theme } from '@/components/theme/theme';
import { Products } from '@/AdminComponents/Products/ui/products';
import { PromoCodes } from '@/admin/components/PromoCodes';
import { Column, Table } from '@/components/Table';
import { $servers, getServersEvent } from '../_api/servers';
import { Button } from '@/components/Button';
import { Servers } from '../_components/Servers';

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
    const {promocodesList, salary, getPromocodes} = useUnit({
        salary: $salary,
        getPromocodes: getPromocodesEvent,
        promocodesList: $promocodes,
    });

    const getServers = useUnit(getServersEvent);
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

    return <>
        <div>
            <Tabs keepMounted={false} value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="gallery" leftSection={<IconHomeStats />}>
                        Статистика
                    </Tabs.Tab>
                    <Tabs.Tab value="servers" leftSection={<IconSettings />}>
                        Сервера
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
                <Tabs.Panel value="servers">
                    <Servers />
                </Tabs.Panel>
            </Tabs>
        </div>
    </>
}

