'use client'
import { PageTitle } from "../../_components/PageTitle";
import { Button } from "@/components/Button";
import { SimpleAction } from "@/shared/utils/simpleAction";

export default function CreateStore ( ) {


    return (
    <form onSubmit={SimpleAction}>
        <PageTitle title="Профиль сотрудника">
            <Button onClick={SimpleAction}>Изменить</Button>
        </PageTitle>
        {/* <Flex gap={theme.spacing.md} mt={theme.spacing.lg}>
                <Input.Wrapper label="Логин">
                    <Input disabled  />
                </Input.Wrapper>
                <Input.Wrapper label="Фио">
                    <Input  />
                </Input.Wrapper>
                <Input.Wrapper label="VK">
                    <Input  />
                </Input.Wrapper>
                <Input.Wrapper label="Должность">
                    <Input disabled  />
                </Input.Wrapper>
        </Flex>
        <Flex gap={theme.spacing.md} mt={theme.spacing.md}>
                <Input.Wrapper label="Дискорд">
                    <Input  />
                </Input.Wrapper>
                <Input.Wrapper label="SteamID">
                    <Input disabled />
                </Input.Wrapper>
                <Input.Wrapper label="Telegram">
                    <Input  />
                </Input.Wrapper>
        </Flex> */}
        </form>)
};