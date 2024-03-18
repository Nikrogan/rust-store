'use client'
import { theme } from "@/components/theme/theme";
import { Button, Flex, Group, Input, List, ListItem, Select, Space, Title } from "@mantine/core";
import { useForm } from '@mantine/form';

export default function CreateStore ( ) {

    const form = useForm();

    return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Title>Профиль сотрудника</Title>
        <Flex gap={theme.spacing.md} mt={theme.spacing.lg}>
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
        </Flex>

            <Group justify="flex-end" mt="md">
                <Button type="submit">Изменить</Button>
            </Group>
        </form>)
};