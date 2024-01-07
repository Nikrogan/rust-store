'use client'
import { AppShellWrapper } from "@/components/AppShell";
import { Button, Group, Input, List, ListItem, Select } from "@mantine/core";
import { useForm } from '@mantine/form';

export default function CreateStore ( ) {

    const form = useForm();

    return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Input.Wrapper label="Логин">
                    <Input  />
                </Input.Wrapper>
                <Input.Wrapper label="Email">
                    <Input  />
                </Input.Wrapper>
                <Input.Wrapper label="Лимит магазинов:">
                    <Input value={5} />
                </Input.Wrapper>
                <List>
                    <ListItem>shokololo.gamestores.app (100%)</ListItem>
                    <ListItem>store.bwrust.ru (100%)</ListItem>
                    <ListItem>turringrust.ru (100%)</ListItem>
                </List>
                <Input.Wrapper label="Комиссия сервиса">
                    <Input />
                </Input.Wrapper>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>)
};