'use client'
import { AppShellWrapper } from "@/components/AppShell";
import { Button, Group, Input, Select } from "@mantine/core";
import { useForm } from '@mantine/form';

export default function CreateStore ( ) {

    const form = useForm();

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Input.Wrapper label="Название">
                    <Input  />
                </Input.Wrapper>
                <Input.Wrapper label="Домен">
                    <Input  />
                </Input.Wrapper>
                <Input.Wrapper label="Название">
                    <Input  />
                </Input.Wrapper>
                <Input.Wrapper label="Товары и категории">
                    <Select data={['Стандартный список', 'Lava', 'Tome', 'Paypal']}  />
                </Input.Wrapper>
                <Input.Wrapper label="Комиссия сервиса">
                    <Input />
                </Input.Wrapper>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>)
};