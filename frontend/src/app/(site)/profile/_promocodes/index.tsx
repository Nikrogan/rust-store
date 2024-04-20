import { Table } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { $PromoCodeList, getPromoCodeListEvent } from "./store";

    
export const PromoCodesTable =  () => {
    const getPromoCodeList = useUnit(getPromoCodeListEvent);
    const {data, isLoading} = useUnit($PromoCodeList);

    useEffect(() => {
        getPromoCodeList()
    }, []);

    const promocodesTableData = {
        head: ['Дата', 'Промокод', 'Сумма'],
        body: isLoading ? [] : data.map(item => {
            return [new Date(item.dateActivate).toDateString(), item.promoCode, item.moneyValue]
        }),
    }  

    return <Table data={promocodesTableData} />
}