'use client'
import { Input, InputLabel } from "@/components/form/input/Input"
import { PageTitle } from "../../_components/PageTitle"

export default  function SharedSettings() {
    return (
        <>
        <PageTitle title="Общие настройки магазина" />
        <InputLabel>
            Секретный ключ
            <Input />
        </InputLabel>
        <InputLabel>
        Стартовый баланс
            <Input />
        </InputLabel>
        </>
    )
}