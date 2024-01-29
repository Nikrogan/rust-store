'use client'
import { AppShellWrapper } from "@/components/AppShell";
import { Box, Button, Group, Input, Select, Title } from "@mantine/core";
import { useForm } from '@mantine/form';

export default function CreateStore ( ) {

    const form = useForm();

    return (
        <>
        <Title>Добавление магазина</Title>
        <Box bg="#F7F7F7" p={60}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Input.Wrapper label="Название">
                    <Input />
                </Input.Wrapper>
                <Input.Wrapper label="Домен">
                    <Input />
                </Input.Wrapper>
                <Input.Wrapper label="Название">
                    <Input />
                </Input.Wrapper>
                <Input.Wrapper label="Товары и категории">
                    <Select data={['Стандартный список', 'Lava', 'Tome', 'Paypal']} />
                </Input.Wrapper>
                <Input.Wrapper label="Комиссия сервиса">
                    <Input />
                </Input.Wrapper>
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
        </>)
};