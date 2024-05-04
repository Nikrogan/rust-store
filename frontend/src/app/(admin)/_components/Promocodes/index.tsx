'use client'
import { Button } from "@/components/Button"
import { PageTitle } from "../PageTitle"
import { Modal } from "@/pageComponents/Modal"
import { useLayoutEffect, useState } from "react"
import { Input, InputLabel, InputLabelText } from "@/components/form/input/Input"
import { SimpleAction } from "@/shared/utils/simpleAction"
import styled from "styled-components"
import { useUnit } from "effector-react"
import { $promocodes, getPromocodesEvent } from "../../_api/promocodes"
import { Column } from "@/components/Table"
import { TableWrapper } from "@/components/TableWrapper"

export const PromoCodes = () => {
    const [isOpen, setOpen] = useState();
    const getPromocodes = useUnit(getPromocodesEvent)
    const {data, isLoading} = useUnit($promocodes)
    useLayoutEffect(() => {
        getPromocodes()
    }, []);

    const handleCreatePromo = () => {
        SimpleAction();
        setOpen(false);
    }


    return <>
        <PageTitle title="Страница управления промокодами">
            <Button onClick={() => setOpen(true)}>Создать промокод</Button>
        </PageTitle>
        <TableWrapper columnList={columnList} rowList={data || []}/>
        <Modal isOpen={isOpen} title="Создания промокода" onClose={() => setOpen(false)} buttonGroup={() => {
            return <Button width='120px' position='center' fontSize='16px' p='6px' onClick={handleCreatePromo}>Создать</Button>
        }}>
            <InputLabel>
                <InputLabelText>Выберите тип промокода</InputLabelText>
                <SelectTemp onClick={SimpleAction}/>
            </InputLabel>
            <InputLabel>
                <InputLabelText>Промокод</InputLabelText>
                <Input/>
            </InputLabel>
        </Modal>
    </>
}

const SelectTemp = styled.div`
    height: 44px;
    border: 1px solid white;
    cursor: pointer;
`

const columnList: Column[] = [
    {
        name: "promoCode",
        title: 'Промокод'
    },
    {
        name: "alreadyUses",
        title: 'Всего использований'
    },
    {
        name: "maxUses",
        title: 'Максимальное кол-во использований',
        width: 220
    },
    {
        name: "createTime",
        title: 'Дата создания',
        width: 220
    },
    {
        name: "endTime",
        title: 'Действует до',
        width: 220
    },
    {
        name: "moneyValue",
        title: 'Значение',
        width: 220
    },
    {
        name: "moneyValue",
        title: 'Значение',
        width: 220
    },
]