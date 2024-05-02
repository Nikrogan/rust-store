'use client'
import { Input, InputWrapper, Tabs } from "@mantine/core"
import { PageTitle } from "../../_components/PageTitle"

export default  function SharedSettings() {
    return (
        <>
        <PageTitle title="Общие настройки магазина" />
        <InputWrapper label="Секретный ключ">
            <Input />
        </InputWrapper>
        <InputWrapper label="Стартовый баланс">
            <Input />
        </InputWrapper>
        </>
    )
}