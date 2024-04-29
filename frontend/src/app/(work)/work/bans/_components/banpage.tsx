'use client'
import { Title } from "@/app/(work)/_components/Title"
import { useUnit } from "effector-react"
import { useEffect } from "react"
import { request, store } from "./store"
import styled from "styled-components"
import { color } from "@/config/theme"
import { Button } from "@/components/Button"

export const Banpage = () => {
    const getData = useUnit(request);
    const {isLoading, data} = useUnit(store);
    useEffect(() => {
        getData()
    }, [])

    if(isLoading) return null;

    const viewUser = data.map((item) => {
        return <UserCard key={item.id} {...item}/>
    })
    return <div>
        <Title>Статистика проверенных игроков</Title>
        <ViewUserList>
            {viewUser}
        </ViewUserList>
        </div>
}

const ViewUserList = styled.div`
    display: flex;
    gap: 16px;
`


const UserCard = ({...user}) => {
    return <UserContainer>
        <div>SteamID: {user.steamId}</div>
        <div>DiscrodID: {user.discordId}</div>
        <div>Date: {user.date}</div>
        <div>Comment: {user.comment}</div>
        <div>Result: {user.result}</div>
        <div>ModeratorID: {user.moderatorId}</div>
        <StyledButton>Разбанить</StyledButton>
    </UserContainer>
};

const UserContainer = styled.div`
    background: ${color.secondary};
    padding: 8px;
`

const StyledButton = styled(Button)`
    color: white;
    margin-top: 12px;
`

