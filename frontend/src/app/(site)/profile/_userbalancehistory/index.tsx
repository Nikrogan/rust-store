import { Table } from "@mantine/core"
import { useUnit } from "effector-react"
import { useEffect } from "react"
import { $userBalanceHistory, getUserBalanceHistoryEvent } from "./store";

export const UserBalanceHistoryTable = () => {
    const getUserBalanceHistory = useUnit(getUserBalanceHistoryEvent);
    const {isLoading, data} = useUnit($userBalanceHistory);
    const historyBalanceTableData = {
        head: ['Дата', 'Операция', 'Сумма', 'Платежная система'],
        body: isLoading ? [] : data.map(item => {
            return [new Date(item.dateTime).toDateString(), item.operationType, item.paymentSystem]
        }),
    };
    useEffect(() => {
        getUserBalanceHistory()
    }, [])
    return <Table data={historyBalanceTableData} />
}