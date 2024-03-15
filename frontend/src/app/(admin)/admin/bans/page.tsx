'use client'
import { theme } from "@/components/theme/theme";
import { ButtonWrapper } from "@/shared/ButtonWrapper/ButtonWrapper";
import { $userStores } from "@/store/auth";
import { Flex, Table, Title, Box, Modal, Input, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useUnit } from "effector-react";
import { $playerCheck, createPlayerCheckEvent, getPlayersCheckEvent } from "./store";
import { useEffect } from "react";


const data = {
    head: [
        "Проверяющий",
        "Стим ИД игрока",
        "Дискорд ИД Игрока",
        "Результат проверки",
        "Дата проверки",
        "Комментарии",
    ]
}

function Bans() {
    const [opened, { open, close }] = useDisclosure(false);
    const {user} = useUnit($userStores);
    const { playerChecks, getPlayersCheck, createPlayerCheck } = useUnit({
        playerChecks: $playerCheck,
        getPlayersCheck: getPlayersCheckEvent,
        createPlayerCheck: createPlayerCheckEvent
    })


    const form = useForm({
        initialValues: {
          moderatorId: user?.steamId,
          steamId: '',
          discordId: '',
          result: '',
          date: null,
          comment: ''
        },
    
        validate: {
        },
      });

    useEffect(() => {
        getPlayersCheck()
    }, [])

    return (
        <>
        <Flex align="center" justify="space-between">
            <Title>Таблица для модераторов</Title>
            <Box>
                <ButtonWrapper variant="outline" onClick={open}>Добавить игрока</ButtonWrapper>
                <ButtonWrapper ml={theme.spacing.md} variant="outline" onClick={getPlayersCheck}>Обновить таблицу</ButtonWrapper>
            </Box>
        </Flex>
        <Box mt={theme.spacing.lg}>
            <Table data={playerChecks}/>
        </Box>
        {opened && <Modal opened={opened} onClose={close} title="Добавление проверенного игрока">
            <form onSubmit={form.onSubmit((values) => {
                close()
                createPlayerCheck(values)
            })}>
                <Box>
                    <Input.Label>Стим ИД игрока</Input.Label>
                    <Input {...form.getInputProps('steamId')} required/>
                </Box>
                <Box mt={theme.spacing.md}>
                    <Input.Label>Дискорд ИД Игрока</Input.Label>
                    <Input {...form.getInputProps('discordId')} required/>
                </Box>
                <Box mt={theme.spacing.md}>
                    <Input.Label>Результат проверки</Input.Label>
                    <Select required data={[ 'Макрос', 'Читы', 'Отказ от проверки', 'Игра с читером','Нужна перепровека', 'Не найдено', 'Другое']} {...form.getInputProps('result')}/>
                </Box>
                <Box mt={theme.spacing.md}>
                    <Input.Label>Дата проверки</Input.Label>
                    <DateInput placeholder="2024.02.22" {...form.getInputProps('date')} />
                </Box>
                <Box mt={theme.spacing.md}>
                    <Input.Label>Комментарий</Input.Label>
                    <Input {...form.getInputProps('comment')}/>
                </Box>
                <Flex mt={theme.spacing.lg} justify="flex-end">
                    <ButtonWrapper variant="outline">Отменить</ButtonWrapper>
                    <ButtonWrapper type="submit" ml={theme.spacing.md} variant="outline">Добавить</ButtonWrapper>
                </Flex>

            </form>
        </Modal>
        }
        </>
    )
}

export default Bans