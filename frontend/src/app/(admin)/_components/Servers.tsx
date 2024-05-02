'use client'
import { Button } from "@/components/Button"
import { Column, Table } from "@/components/Table"
import { useEffect, useLayoutEffect, useMemo } from "react";
import { $servers, addServerEvent, getServersEvent } from "../_api/servers";
import { useUnit } from "effector-react";
import styled from "styled-components";

export const Servers = () => {
    const {data: serverList, isLoading} = useUnit($servers);
    const getServers = useUnit(getServersEvent);
    const addServerRequst = useUnit(addServerEvent);

    const columns = useMemo(() => columnList, []);

    useLayoutEffect(() => {
        getServers()

    }, [])


    const handleAddServer = (data) => {
        const a = null;
        alert('Идите нахуй, админ бухает!')
        a && addServerRequst()
    }

    return (
    <>
    <Header>
        <h1>Список серверов</h1>
        <Button onClick={handleAddServer}>Добавить сервер</Button>
    </Header>
        {(serverList !== null && !isLoading) && <Table columnList={columns} rowList={[]} />}
        </>
    )
}


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    height: 44px;
    align-items: center;
    margin-top: 24px;
`

const columnList: Column[] = [
    {
        name: 'ip',
        title: 'Server IP',
        width: 120
    },
    {
        name: 'name',
        title: 'Наименование сервера'
    },
    {
        name: 'currentOnline',
        title: 'Текущий онлайн'
    },
    {
        name: 'maxOnline',
        title: 'Максимальный онлайн'
    },
    {
        name: 'queue',
        title: 'Текущая очередь'
    },
    {
        name: 'queryPort',
        title: 'Query порт сервера'
    },
    {
        name: 'gamePort',
        title: 'Игровой порт сервера'
    },
]