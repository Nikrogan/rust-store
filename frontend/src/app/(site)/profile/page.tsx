'use client'
import { theme } from '@/components/theme/theme'
import { Box, Flex, Image, Table, Text, Title } from '@mantine/core'
import { useUnit } from 'effector-react'
import { $userStores } from '@/store/auth'
import { PromoCodesTable } from './_promocodes'
import { UserBalanceHistoryTable } from './_userbalancehistory'
import { UserBasket } from './_userbasket'
import styled from 'styled-components'
import { color } from '@/config/theme'
import { Tabs } from '@/components/Tabs'



const TabsHeader = styled.div`
  cursor: pointer;
  background: ${color.primary};
  padding: 2px 8px;
  max-width: 186px;
  width: 100%;
  text-align: center;
  border: ${({isActive}) => isActive ? `1px solid ${color.accent}` : 'none'};

  & + & {
    margin-left: 16px;
  }
`

const headerList = [
  {
      id: 'inventory',
      render: ({...data}) => <TabsHeader {...data}>Инвентарь</TabsHeader>
  },
  {
      id: 'historyBalance',
      render: ({...data}) => <TabsHeader {...data}>История баланса</TabsHeader>
  },
  {
      id: 'promocodes',
      render: ({...data}) => <TabsHeader {...data}>Промокоды</TabsHeader>
  },
  {
      id: 'individualOffers',
      render: ({...data}) => <TabsHeader {...data}>Личные предложения</TabsHeader>
  },
]

const tabsContentList = [
  {
      id: 'inventory',
      render: ({...data}) => <UserBasket {...data} />
  },
  {
      id: 'historyBalance',
      render: ({...data}) => <UserBalanceHistoryTable {...data} />
  },
  {
      id: 'promocodes',
      render: ({...data}) => <PromoCodesTable {...data} />
  },
  {
      id: 'individualOffers',
      render: ({...data}) => <div {...data}>gavno</div>
  },
]

export default function ProfilePage() {
  const { user } = useUnit($userStores);

  return (
    <div>
        <Flex justify="start" w="100%" mt={24}>
          <Title>Профиль</Title>
        </Flex>
        <Box bg={theme.colors?.dark?.[9]} p={theme.spacing.md} mt={theme.spacing.lg}>
        <Flex justify="space-between" align='center' >
          <Box>
            <Flex align='center'>
            <Image src={user?.avatarUrl} w={100} h={100} radius={theme.radius?.sm} />
            <Flex direction="column" ml='md'>
              <Text>{user?.displayName}</Text>
              <StyledText>Steam ID: &nbsp;<a target='_blank' href={`https://steamcommunity.com/profiles/${user?.steamId}`}>{user?.steamId}</a></StyledText>
            </Flex>
            </Flex>
          </Box>
        </Flex>
        <Tabs defaultTabId='inventory' headerList={headerList} tabsContentList={tabsContentList}/>
        </Box>
    </div>
  )
}

const StyledText = styled(Text)`
  display: flex;

  a {
    color: ${color.accent};

    &:hover {
      transform: scale(1.01);
    }
  }
`