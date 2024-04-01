'use client'
import { theme } from "@/components/theme/theme"
import { Input, InputWrapper, Tabs } from "@mantine/core"

export default  function SharedSettings() {
    return (
        <>
        <InputWrapper label="Секретный ключ">
            <Input />
        </InputWrapper>
        <InputWrapper label="Стартовый баланс">
            <Input />
        </InputWrapper>
        </>
    )
}