'use client'
import { useUnit } from 'effector-react'
import { $userStores } from '@/store/auth'
import { UserBalanceHistoryTable } from './_userbalancehistory'
import { UserBasket } from './_userbasket'
import styled from 'styled-components'
import { color } from '@/config/theme'
import { TabButton, Tabs } from '@/components/Tabs'
import Image from 'next/image'
import { useMemo } from 'react'

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

export default function ProfilePage() {
  const { user, isLoading } = useUnit($userStores);
  const headerList = useMemo(() => [
    {
        id: 'inventory',
        render: ({...data}) => <TabButton {...data}>Корзина</TabButton>
    },
    {
        id: 'historyBalance',
        render: ({...data}) => <TabButton {...data}>История баланса</TabButton>
    },
  ], []);

  const tabsContentList = useMemo(() => [
    {
        id: 'inventory',
        render: ({...data}) => <UserBasket {...data} />
    },
    {
        id: 'historyBalance',
        render: ({...data}) => <UserBalanceHistoryTable {...data} />
    },
  
  ], [])

  return (
    <>
        <PageTitle>Профиль</PageTitle>
        <ProfileContainer>
          {!isLoading && (
          <>
          <UserContainer>
            <UserImageContainer>
              <Image src={user.avatarUrl} alt='userImage' width={100} height={100} />
            </UserImageContainer>
            <UserDataContainer>
              <div>{user?.displayName}</div>
              <StyledText>Steam ID: &nbsp;<a target='_blank' href={`https://steamcommunity.com/profiles/${user?.steamId}`}>{user?.steamId}</a></StyledText>
            </UserDataContainer>
          </UserContainer>
          <Tabs defaultTabId='inventory' headerList={headerList} tabsContentList={tabsContentList} />
          </>
        )
        }
        </ProfileContainer>
    </>
  )
}

const StyledText = styled.div`
  display: flex;
  
  a {
    color: ${color.accent};

    &:hover {
      transform: scale(1.01);
    }
  }
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`

const UserImageContainer = styled.div`
  width: 100px;
  height: 100px;
  img {
    border-radius: 16px;
  }
`

const ProfileContainer = styled.div`
  background: #141414;
  padding: 16px;
`

const PageTitle = styled.h1`
  margin: 24px 0;
`