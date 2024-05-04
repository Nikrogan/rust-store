import { useUnit } from "effector-react"
import { useEffect } from "react"
import { $userBalanceHistory, getUserBalanceHistoryEvent } from "./store";
import { Column} from "@/components/Table";
import { TableWrapper } from "@/components/TableWrapper";

export const UserBalanceHistoryTable = () => {
    const getUserBalanceHistory = useUnit(getUserBalanceHistoryEvent);
    const {isLoading, data} = useUnit($userBalanceHistory);

    useEffect(() => {
        getUserBalanceHistory()
    }, [])
    return <TableWrapper columnList={cols} rowList={data || []} />
}


const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
};

const cols: Column[] = [
    {
        name: "dateTime",
        title: "Дата",
        renderCell: (data) =>  new Date(data).toLocaleString("ru", options),
        width: 130
    },
    {
        name: "operationType",
        title: "Операция"
    },
    {
        name: "date",
        title: "Сумма"
    },
    {
        name: "paymentSystem",
        title: "Платежная система"
    },

]

