import { useUnit } from "effector-react"
import { useEffect } from "react"
import { $userBalanceHistory, getUserBalanceHistoryEvent } from "./store";
import { Column} from "@/components/Table";
import { TableWrapper } from "@/components/TableWrapper";
import { DateFormatter } from "@/shared/utils/dateFormatter";

export const UserBalanceHistoryTable = () => {
    const getUserBalanceHistory = useUnit(getUserBalanceHistoryEvent);
    const {isLoading, data} = useUnit($userBalanceHistory);

    useEffect(() => {
        getUserBalanceHistory()
    }, [])
    return <TableWrapper columnList={cols} rowList={data || []} />
}


const cols: Column[] = [
    {
        name: "dateTime",
        title: "Дата",
        renderCell: (date) => {
            return DateFormatter(date)
        },
        width: 140
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
        title: "Платежная система",
        width: 220
    },

]

