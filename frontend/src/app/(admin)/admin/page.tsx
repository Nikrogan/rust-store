'use client'
import { MainStat } from "@/AdminComponents/MainStat/MainStat";
import { StatsPanel } from "@/AdminComponents/StatsPanel/StatsPanel";
import { Box, Text, Title } from "@mantine/core";


const data = [
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

export default function AdminPage () {
    return (
      <Box ml={32} mr={32}>
        <Title c="#141517" h={1} mt={32}>Главная</Title>
        <StatsPanel />
        <MainStat data={data} />
      </Box>
    )
}