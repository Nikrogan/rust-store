'use client'
import { PageTitle } from "@/app/(admin)/_components/PageTitle";
import { theme } from "@/components/theme/theme";
import { AreaChart } from "@mantine/charts";

const mock = [
    {
      date: 'Mar 22',
      C4: 2,
      МВК: 20,
      SurvivorFree: 5,
      Rocket: 90
    },
    {
      date: 'Mar 23',
      "Timed Explosive Charge": 10,
      МВК: 25,
      SurvivorFree: 5,
      Rocket: 90
    },
    {
      date: 'Mar 24',
      Apples: 15,
      Oranges: 2,
      Tomatoes: 3,
    },
    {
      date: 'Mar 25',
      Apples: 51,
      Oranges: 57,
      Tomatoes: 1,
    },
    {
      date: 'Mar 26',
      Apples: 12,
      Oranges: 32,
      Tomatoes: 51,
    },
];

const TableHeaderData = [
    'Игрок',
    'СтимИд',
    'Купленный товар'
]

const TableContentData = [
    {
        nickname: 'Долбаеб288',
        steamId: 1231231231231231,
        anime: 'ХУЙ',
        anime2: 'ХУЙ'
    },
    {
        nickname: 'Долбаеб288',
        steamId: 1231231231231231,
        anime: 'ХУЙ',
        anime2: 'ХУЙ'
    },
    {
        nickname: 'Долбаеб288',
        steamId: 1231231231231231
    },
    {
        nickname: 'Долбаеб288',
        steamId: 1231231231231231
    },
    {
        nickname: 'Долбаеб288',
        steamId: 1231231231231231
    },
    {
        nickname: 'Долбаеб288',
        steamId: 1231231231231231,
        anime: 'ХУЙ',
        anime2: 'ХУЙ',
        anime3: 'ХУЙ',
        anime4: 'ХУЙ'
    },
]

const seriesComplite = {}
  
export const Stats = () => {
    mock.map((item) => {
        return Object.keys(item).map(item => {
            if(item === 'date') return;
            if(seriesComplite[item]) return;
    
            seriesComplite[item] = item;
        })
    });
    const series = Object.keys(seriesComplite).map((item, i) => ({name: item, color: `indigo.${i + 1}`}));

    return <div>
    <PageTitle title="Страница статистики покупки товаров"/>
    <AreaChart
        h={300}
        mt={theme.spacing.lg}
        data={mock}
        dataKey="date"
        series={series}
        curveType="linear"
    />
</div>
}