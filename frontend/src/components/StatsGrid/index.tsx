import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';
import styled from 'styled-components';
import { color } from '@/config/theme';

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: 'Доход', icon: 'receipt', value: '13,456', diff: 34 },
  { title: 'Чистыми', icon: 'coin', value: '4,145', diff: -13 },
  { title: 'Использованные купоны', icon: 'discount', value: '745', diff: 18 },
  { title: 'Новых пользователей', icon: 'user', value: '188', diff: -30 },
] as const;

export function StatsGrid() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <StatContainer key={stat.title}>
        <StatTitleContainer>
          <div size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </div>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </StatTitleContainer>

        <StatValueContainer mt={25}>
          <div className={classes.value}>{stat.value}</div>
          <div c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>&nbsp;{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </div>
        </StatValueContainer>

        <div fz="xs" c="dimmed" mt={7}>
          По сравнению с предыдущем месяцем
        </div>
      </StatContainer>
    );
  });

  return (
    <StatsContainer className={classes.root}>
      {stats}
    </StatsContainer>
  );
}

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 16px;
  background: ${color.secondary}
`

const StatTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StatValueContainer = styled.div`
  display: flex;
  margin-top: 24px;
  color: white;
`

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;
`